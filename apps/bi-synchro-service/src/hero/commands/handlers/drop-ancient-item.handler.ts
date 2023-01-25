import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroRepository } from '../../repository/hero.repository';
import { DropAncientItemCommand } from '../impl/drop-ancient-item.command';
import { StoreEventPublisher } from '@eventsource/index';
import { Logger } from '@nestjs/common';

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler
  implements ICommandHandler<DropAncientItemCommand>
{
  private logger = new Logger('DropAncientItemHandler');

  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: DropAncientItemCommand) {
    this.logger.verbose('execute');
    console.log(clc.yellowBright('Async DropAncientItemCommand...'));

    const { heroId, itemId } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(heroId),
    );
    hero.addItem(itemId);
    hero.commit();
  }
}
