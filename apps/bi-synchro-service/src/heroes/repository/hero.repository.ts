import { Injectable, Logger } from '@nestjs/common';
import { Hero } from '../models/hero.model';
import { userHero } from './fixtures/user';

@Injectable()
export class HeroRepository {
  private logger = new Logger('HeroRepository');

  async findOneById(id: number): Promise<Hero> {
    this.logger.verbose('findOneById');
    return userHero;
  }

  async findAll(): Promise<Hero[]> {
    this.logger.verbose('findAll');
    return [userHero];
  }
}
