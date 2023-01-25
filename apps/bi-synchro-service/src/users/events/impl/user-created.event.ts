import { StorableEvent } from '@eventsource/index';
import { Logger } from '@nestjs/common';

export class UserCreatedEvent extends StorableEvent {
  private logger = new Logger('UserCreatedEvent');

  eventAggregate = 'UserCreatedEvent';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly created: Date,
  ) {
    super();
    this.logger.verbose('constructor');
  }
}
