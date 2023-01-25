import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus } from '@eventsource/index';
import { CreateUserCommand } from '../impl/create-user.command';
import { UidGenerator } from '../../../common/uid-generator';
import { DateFactory } from '../../../common/date.factory';
import { GetUserByEmailHandler } from '../../queries/handlers/get-user-by-email.handler';
import { UserCreatedEvent } from '../../events/impl/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private logger = new Logger('CreateUserHandler');

  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly uid: UidGenerator,
    private readonly dateFactory: DateFactory,
    private getUserByEmailHandler: GetUserByEmailHandler,
  ) {}

  async execute(command: CreateUserCommand) {
    this.logger.verbose('execute');
    const user = await this.getUserByEmailHandler.execute({
      email: command.email,
    });
    if (user) {
      throw new BadRequestException('User exist');
    }
    const { name, email } = command;
    const id = this.uid.generate();
    this.eventBus.publish(
      new UserCreatedEvent(id, name, email, this.dateFactory.now()),
    );
    return id;
  }
}
