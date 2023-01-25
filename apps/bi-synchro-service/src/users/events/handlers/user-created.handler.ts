import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl/user-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  private logger = new Logger('UserCreatedHandler');

  handle(event: UserCreatedEvent) {
    this.logger.verbose('handle');
    // tslint:disable-next-line: no-console
    console.log('User created! ', event);
  }
}
