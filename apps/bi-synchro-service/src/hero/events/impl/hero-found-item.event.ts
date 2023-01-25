import { StorableEvent } from '@eventsource/index';

export class HeroFoundItemEvent extends StorableEvent {
  eventAggregate = 'hero';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly itemId: string) {
    super();
  }
}
