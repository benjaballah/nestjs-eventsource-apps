import { Logger } from '@nestjs/common/services';
import { StorableEvent } from './interfaces/storable-event';
import * as eventstore from 'eventstore';
import * as url from 'url';

export class EventStore {
  private logger = new Logger('EventStore');
  /**
   * A private variable that is readonly.
   */
  private readonly eventstore;

  /**
   * A private variable that is readonly.
   */
  private eventStoreLaunched = false;

  /**
   * It takes a MongoDB URL as a parameter, parses it, and then initializes the eventstore.
   *
   * @param mongoURL  - (string) - The URL of the MongoDB instance to connect to.
   *
   */
  constructor(mongoURL: string) {
    let ssl = false;

    const parsed = url.parse(mongoURL, true);

    if (
      parsed.query &&
      parsed.query.ssl !== undefined &&
      parsed.query.ssl === 'true'
    ) {
      ssl = true;
    }

    this.eventstore = eventstore({
      type: 'mongodb',
      url: mongoURL,
      options: {
        ssl: ssl,
      },
    });
    this.eventstore.init((err) => {
      if (err) {
        throw err;
      }
      this.eventStoreLaunched = true;
    });
  }

  /**
   * This function returns a boolean value that indicates whether the event store has been launched or
   * not.
   *
   * @returns A boolean value.
   *
   */
  public isInitiated(): boolean {
    this.logger.verbose('isInitiated');
    return this.eventStoreLaunched;
  }

  /**
   * It gets the events from the eventstore and returns them as an array of StorableEvent objects.
   *
   * @param aggregate  - (string) - The name of the aggregate
   * @param id  - (string) - The id of the aggregate
   * @returns An array of StorableEvent objects.
   *
   */
  public async getEvents(
    aggregate: string,
    id: string,
  ): Promise<StorableEvent[]> {
    this.logger.verbose('getEvents');
    return new Promise<StorableEvent[]>((resolve) => {
      this.eventstore.getFromSnapshot(
        this.getAgrregateId(aggregate, id),
        (err, snapshot, stream) => {
          // snapshot.data; // Snapshot
          resolve(
            stream.events.map((event) =>
              this.getStorableEventFromPayload(event.payload),
            ),
          );
        },
      );
    });
  }

  /**
   * "Get the event at the given index, and return it as a StorableEvent."
   *
   * The function is asynchronous, so it returns a Promise. The function uses the eventstore's getEvents
   * function to get the event at the given index. If the event exists, it returns the event as a
   * StorableEvent. If the event doesn't exist, it returns null.
   *
   * @param index  - (number) - The index of the event you want to retrieve.
   * @returns A promise that resolves to a StorableEvent.
   *
   */
  public async getEvent(index: number): Promise<StorableEvent> {
    this.logger.verbose('getEvent');
    return new Promise<StorableEvent>((resolve, reject) => {
      this.eventstore.getEvents(index, 1, (err, events) => {
        if (events.length > 0) {
          resolve(this.getStorableEventFromPayload(events[0].payload));
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * > It takes an event, gets the event stream for the event's aggregate, adds the event to the
   * stream, and commits the stream.
   *
   * @param event  - (T) - T extends StorableEvent: This is the event that we want to store.
   * @returns A promise that resolves to void.
   *
   */
  public async storeEvent<T extends StorableEvent>(event: T): Promise<void> {
    this.logger.verbose('storeEvent');
    return new Promise<void>((resolve, reject) => {
      if (!this.eventStoreLaunched) {
        reject('Event Store not launched!');
        return;
      }
      this.eventstore.getEventStream(
        {
          aggregateId: this.getAgrregateId(event.eventAggregate, event.id),
          aggregate: event.eventAggregate,
        },
        (err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          stream.addEvent(event);
          stream.commit((commitErr) => {
            if (commitErr) {
              reject(commitErr);
            }
            resolve();
          });
        },
      );
    });
  }

  /**
   * It takes an event payload, adds a constructor property to it, and then returns a new object that
   * has the payload as its prototype.
   * Monkey patch to obtain event 'instances' from db.
   *
   * @param payload  - (any) - any - this is the event payload that is being passed in.
   * @returns An object with the same properties as the payload, but with a constructor property that
   * has a name property.
   *
   */
  private getStorableEventFromPayload(payload: any): StorableEvent {
    this.logger.verbose('getStorableEventFromPayload');
    const eventPlain = payload;
    eventPlain.constructor = { name: eventPlain.eventName };

    return Object.assign(Object.create(eventPlain), eventPlain);
  }

  /**
   * It takes an aggregate name and an id and returns a string that is the aggregate name concatenated
   * with the id.
   *
   * @param aggregate  - (string) - The name of the aggregate.
   * @param id  - (string) - The id of the aggregate.
   * @returns The aggregate and the id concatenated together with a dash in between.
   *
   */
  private getAgrregateId(aggregate: string, id: string): string {
    this.logger.verbose('getAgrregateId');
    return aggregate + '-' + id;
  }
}
