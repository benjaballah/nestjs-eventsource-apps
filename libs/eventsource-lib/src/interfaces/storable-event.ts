import { IEvent } from '@nestjs/cqrs';

export abstract class StorableEvent implements IEvent {
  abstract id: string;
  abstract eventAggregate: string;
  abstract eventVersion: number;
  eventName: string;

  constructor() {
    this.eventName = this.constructor.name;
  }
}
