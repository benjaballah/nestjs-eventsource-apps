import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroeQuery } from '../impl';
import { Logger } from '@nestjs/common';

@QueryHandler(GetHeroeQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroeQuery> {
  private logger = new Logger('GetHeroesHandler');

  constructor(private readonly repository: HeroRepository) {}

  async execute(query: GetHeroeQuery) {
    this.logger.verbose('execute');
    console.log(clc.yellowBright('Async GetHeroesQuery...'));
    return this.repository.findOneById(query.id);
  }
}
