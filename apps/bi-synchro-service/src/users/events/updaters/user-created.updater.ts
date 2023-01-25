import { Logger } from '@nestjs/common';
import { Redisk } from 'redisk';
import { IViewUpdater, ViewUpdaterHandler } from '@eventsource/index';
import { UserCreatedEvent } from '../impl/user-created.event';
import { User } from '@synchro/users/entities/user.entity';

@ViewUpdaterHandler(UserCreatedEvent)
export class UserCreatedUpdater implements IViewUpdater<UserCreatedEvent> {
  private logger = new Logger('UserCreatedUpdater');

  constructor(private readonly redisk: Redisk) {}

  async handle(event: UserCreatedEvent) {
    this.logger.verbose('handle');
    const { id, name, email, created } = event;
    await this.redisk.save<User>(new User(id, name, email, created));
  }
}
