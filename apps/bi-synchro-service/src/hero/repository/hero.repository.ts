import { Injectable, Logger } from '@nestjs/common';
import { Hero } from '../models/hero.model';
import { EventStore } from '@eventsource/index';

@Injectable()
export class HeroRepository {
  private logger = new Logger('HeroRepository');

  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<Hero> {
    this.logger.verbose('findOneById');
    const hero = new Hero(id);
    hero.loadFromHistory(await this.eventStore.getEvents('hero', id));
    return hero;
  }
}
