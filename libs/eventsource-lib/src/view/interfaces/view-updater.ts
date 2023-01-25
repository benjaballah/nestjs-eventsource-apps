import { IEventHandler, IEvent } from '@nestjs/cqrs';

/* Defining an interface that extends the IEventHandler interface. */
export interface IViewUpdater<T extends IEvent> extends IEventHandler<IEvent> {
  handle(event: T): Promise<void>;
}
