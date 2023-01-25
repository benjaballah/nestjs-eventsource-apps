import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { HeroKilledDragonEvent } from '../impl/hero-killed-dragon.event';
import { Logger } from '@nestjs/common';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler
  implements IEventHandler<HeroKilledDragonEvent>
{
  private logger = new Logger('HeroKilledDragonHandler');

  handle(event: HeroKilledDragonEvent) {
    this.logger.verbose('handle');
    console.log(clc.greenBright('HeroKilledDragonEvent...'));
  }
}
