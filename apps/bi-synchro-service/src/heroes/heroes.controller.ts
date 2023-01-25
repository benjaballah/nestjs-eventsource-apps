import { Body, Controller, Get, Param, Post, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { KillDragonCommand } from './commands/impl/kill-dragon.command';
import { KillDragonDto } from './interfaces/kill-dragon-dto.interface';
import { Hero } from './models/hero.model';
import { GetHeroesQuery } from './queries/impl';

@Controller('heroes')
export class HeroesGameController {
  private logger = new Logger('HeroesGameController');

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/kill')
  async killDragon(@Param('id') id: string, @Body() dto: KillDragonDto) {
    this.logger.verbose('killDragon');
    return this.commandBus.execute(new KillDragonCommand(id, dto.dragonId));
  }

  @Get()
  async findAll(): Promise<Hero[]> {
    this.logger.verbose('findAll');
    return this.queryBus.execute(new GetHeroesQuery());
  }
}
