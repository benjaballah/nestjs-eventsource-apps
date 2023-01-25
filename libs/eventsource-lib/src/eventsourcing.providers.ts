import { ViewUpdater } from './view';
import { ViewEventBus } from './view';
import { StoreEventBus } from './store-event-bus';
import { StoreEventPublisher } from './store-event-publisher';
import { AggregateRepository } from './aggregate-repository';

/**
 * It creates a list of providers that are used to create the event sourcing system.
 *
 * @returns An array of providers.
 *
 */
export function createEventSourcingProviders() {
  return [
    ViewUpdater,
    ViewEventBus,
    StoreEventBus,
    StoreEventPublisher,
    AggregateRepository,
  ];
}
