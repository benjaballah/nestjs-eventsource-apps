import { Injectable, Type } from '@nestjs/common';
import { IViewUpdater } from './interfaces/view-updater';
import { IEvent } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { ViewUpdaters } from './view-updaters';
import { Logger } from '@nestjs/common/services';

@Injectable()
export class ViewUpdater {
  private logger = new Logger('ViewUpdater');

  /* Creating a map that will hold the instances of the view updaters. */
  private instances = new Map<
    Type<IViewUpdater<IEvent>>,
    IViewUpdater<IEvent>
  >();

  /**
   * The constructor function is used to inject the moduleRef object into the class.
   *
   * @param moduleRef  - (ModuleRef) - This is the reference to the module that is being created.
   *
   */
  constructor(private moduleRef: ModuleRef) {}

  /**
   * It gets the view updater for the event, creates an instance of it if it doesn't exist, and then
   * calls the handle function on the instance.
   *
   * @param event  - (T) - T extends IEvent - The event that is being handled.
   * @returns A promise that resolves to void.
   *
   */
  async run<T extends IEvent>(event: T): Promise<void> {
    this.logger.verbose(`run ${event.constructor.name}`);
    const updater = ViewUpdaters.get(event.constructor.name);
    if (updater) {
      if (!this.instances.has(updater)) {
        this.instances.set(
          updater,
          this.moduleRef.get(updater, { strict: false }),
        );
      }
      await this.instances.get(updater).handle(event);
    }
    return;
  }
}
