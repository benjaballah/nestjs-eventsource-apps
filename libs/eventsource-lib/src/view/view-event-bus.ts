import { EventBus, IEvent, IEventBus } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { ViewUpdater } from './view-updater';

@Injectable()
export class ViewEventBus implements IEventBus {
  private logger = new Logger('ViewEventBus');

  /**
   * A constructor function..
   *
   * @param eventBus  - (EventBus) - This is the event bus that we'll use to publish events.
   * @param viewUpdater  - (ViewUpdater) - This is a service that will be used to update the view.
   *
   */
  constructor(
    private readonly eventBus: EventBus,
    private viewUpdater: ViewUpdater,
  ) {}

  /**
   * It takes an event, runs the view updater, then publishes the event.
   *
   * @param event  - (T) - The event to publish.
   *
   */
  publish<T extends IEvent>(event: T): void {
    this.logger.verbose('publish');
    this.viewUpdater
      .run(event)
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
