import { AggregateRoot } from '@nestjs/cqrs';
import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event';
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event';
import { Logger } from '@nestjs/common';

export class Hero extends AggregateRoot {
  private logger = new Logger('Hero');

  constructor(private readonly id: string) {
    super();
  }

  killEnemy(enemyId: string) {
    this.logger.verbose('killEnemy');
    // logic
    this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  }

  addItem(itemId: string) {
    this.logger.verbose('addItem');
    // logic
    this.apply(new HeroFoundItemEvent(this.id, itemId));
  }
}
