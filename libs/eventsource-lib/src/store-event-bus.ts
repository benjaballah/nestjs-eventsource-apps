import { Injectable, Logger } from '@nestjs/common';
import { IEvent, IEventBus } from '@nestjs/cqrs';
import { EventStore } from './eventstore';
import { StorableEvent } from './interfaces/storable-event';
import { ViewEventBus } from './view/view-event-bus';

@Injectable()
export class StoreEventBus implements IEventBus {
  private logger = new Logger('StoreEventBus');

  /**
   * A constructor function that takes in two parameters, eventBus and eventStore..
   *
   * @param eventBus  - (ViewEventBus) - This is the event bus that the view will use to publish
   * events.
   * @param eventStore  - (EventStore) - This is the event store that will be used to store the events.
   *
   */
  constructor(
    private readonly eventBus: ViewEventBus,
    private readonly eventStore: EventStore,
  ) {}

  /**
   * It takes an event, checks that it implements the StorableEvent interface, then stores it in the
   * event store and publishes it to the event bus.
   *
   * @param event  - (T) - The event to be published.
   *
   */
  publish<T extends IEvent>(event: T): void {
    this.logger.verbose('publish');
    const storableEvent = event as any as StorableEvent;
    if (
      storableEvent.id === undefined ||
      storableEvent.eventAggregate === undefined ||
      storableEvent.eventVersion === undefined
    ) {
      throw new Error('Events must implement StorableEvent interface');
    }
    this.eventStore
      .storeEvent(storableEvent)
      .then(() => this.eventBus.publish(event))
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Publish all events in the array..
   *
   * @param events  - (IEvent[]) - IEvent[]
   *
   */
  publishAll(events: IEvent[]): void {
    this.logger.verbose('publishAll');
    (events || []).forEach((event) => this.publish(event));
  }
}
