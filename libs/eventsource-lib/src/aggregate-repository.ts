import { Injectable, Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Type } from './metadata';
import { EventStore } from './eventstore';

@Injectable()
export class AggregateRepository {
  private logger = new Logger('AggregateRepository');

  /**
   * The constructor function is a special function that is called when an object is created from a
   * class.
   *
   * @param eventStore  - (EventStore) - This is the event store that we'll use to store our events.
   *
   */
  constructor(private readonly eventStore: EventStore) {}

  /**
   * "Given an aggregate type, aggregate name, and aggregate ID, get the aggregate's events from the
   * event store, create a new aggregate instance, and load the aggregate's events into the aggregate."
   *
   * The first thing we do is get the aggregate's events from the event store. If there are no events,
   * we return null. If there are events, we create a new aggregate instance and load the events into
   * the aggregate.
   *
   * @param type  - () - Type<T> - The type of the aggregate root you want to get.
   * @param aggregateName  - (string) - The name of the aggregate.
   * @param aggregateId  - (string) - The id of the aggregate you want to get.
   * @returns An aggregate root.
   *
   */
  async getById<T extends AggregateRoot>(
    type: Type<T>,
    aggregateName: string,
    aggregateId: string,
  ): Promise<T | null> {
    this.logger.verbose('getById');
    const aggregateEvents = await this.eventStore.getEvents(
      aggregateName,
      aggregateId,
    );

    if (!aggregateEvents || aggregateEvents.length === 0) {
      return null;
    }

    const aggregate = new type(aggregateId);

    aggregate.loadFromHistory(aggregateEvents);

    return aggregate;
  }
}
