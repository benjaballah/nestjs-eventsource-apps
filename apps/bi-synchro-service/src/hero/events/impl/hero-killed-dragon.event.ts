import { StorableEvent } from '@eventsource/index';

export class HeroKilledDragonEvent extends StorableEvent {
  eventAggregate = 'Hero';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly dragonId: string) {
    super();
  }
}
