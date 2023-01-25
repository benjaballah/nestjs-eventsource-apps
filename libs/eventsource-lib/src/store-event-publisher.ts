import { Injectable, Logger } from '@nestjs/common';
import { StoreEventBus } from './store-event-bus';
import { IEvent, AggregateRoot } from '@nestjs/cqrs';

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class StoreEventPublisher {
  private logger = new Logger('StoreEventPublisher');
  /**
   * The constructor function is a special function that is called when an object is created from a
   * class.
   *
   * @param eventBus  - (StoreEventBus) - StoreEventBus - This is the event bus that the store will use
   * to publish events.
   *
   */
  constructor(private readonly eventBus: StoreEventBus) {}

  /**
   * It takes a class as a parameter and returns a new class that extends the original class and adds a
   * publish method to it.
   *
   * @param metatype  - (T) - T: This is the class that we are decorating.
   * @returns A class that extends the metatype (AggregateRoot) and adds a publish method.
   *
   */
  mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T {
    this.logger.verbose('mergeClassContext');
    const eventBus = this.eventBus;
    return class extends metatype {
      publish(event: IEvent) {
        eventBus.publish(event);
      }
      publishAll(events: IEvent[]) {
        eventBus.publishAll(events);
      }
    };
  }

  /**
   * "Merge the event bus into the aggregate root so that it can publish events."
   *
   * The function takes an aggregate root as a parameter and returns the same aggregate root. The
   * function merges the event bus into the aggregate root by adding a publish function to the
   * aggregate root. The publish function takes an event as a parameter and publishes the event to the
   * event bus.
   *
   * @param object  - (T) - The object to merge into the context.
   * @returns The object that was passed in.
   *
   */
  mergeObjectContext<T extends AggregateRoot>(object: T): T {
    this.logger.verbose('mergeObjectContext');
    const eventBus = this.eventBus;
    object.publish = (event) => {
      eventBus.publish(event);
    };
    object.publishAll = (events) => {
      eventBus.publishAll(events);
    };
    return object;
  }
}
