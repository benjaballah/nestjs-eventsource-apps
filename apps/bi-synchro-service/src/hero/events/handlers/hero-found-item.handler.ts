import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroFoundItemEvent } from '../impl/hero-found-item.event';
import { Logger } from '@nestjs/common';

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemHandler implements IEventHandler<HeroFoundItemEvent> {
  private logger = new Logger('HeroFoundItemHandler');

  handle(event: HeroFoundItemEvent) {
    this.logger.verbose('handle');
    console.log(clc.yellowBright('Async HeroFoundItemEvent...'), event);
  }
}
