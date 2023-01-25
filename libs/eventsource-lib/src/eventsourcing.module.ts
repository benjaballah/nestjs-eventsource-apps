import { Module, DynamicModule, Logger } from '@nestjs/common';
import { EventSourcingOptions } from './interfaces';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStore } from './eventstore';
import { createEventSourcingProviders } from './eventsourcing.providers';

@Module({})
export class EventSourcingModule {
  static logger = new Logger('EventSourcingModule');
  /**
   * It creates a new provider for the EventStore class, and exports it.
   *
   * @param options  - (EventSourcingOptions) - EventSourcingOptions - This is the options object that
   * we created earlier.
   * @returns A DynamicModule
   *
   */
  static forRoot(options: EventSourcingOptions): DynamicModule {
    this.logger.verbose('forRoot');
    return {
      module: EventSourcingModule,
      providers: [
        {
          provide: EventStore,
          useValue: new EventStore(options.mongoURL),
        },
      ],
      exports: [EventStore],
      global: true,
    };
  }

  /**
   * It creates a new module that imports the CQRS module and exports the providers that are created by
   * the createEventSourcingProviders() function.
   *
   * @returns A DynamicModule
   *
   */
  static forFeature(): DynamicModule {
    this.logger.verbose('forFeature');
    const providers = createEventSourcingProviders();
    return {
      module: EventSourcingModule,
      imports: [CqrsModule],
      providers: providers,
      exports: providers,
    };
  }
}
