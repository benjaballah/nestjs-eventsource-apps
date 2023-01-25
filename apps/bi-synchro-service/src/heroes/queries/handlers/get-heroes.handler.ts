import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroesQuery } from '../impl';
import { Logger } from '@nestjs/common';

@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroesQuery> {
  private logger = new Logger('GetHeroesHandler');

  constructor(private readonly repository: HeroRepository) {}

  async execute(query: GetHeroesQuery) {
    this.logger.verbose('execute');
    console.log(clc.yellowBright('Async GetHeroesQuery...'));
    return this.repository.findAll();
  }
}
