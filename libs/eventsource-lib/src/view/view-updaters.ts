import { IEvent } from '@nestjs/cqrs';
import { IViewUpdater } from './interfaces/view-updater';
import { Type } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';

// export class ViewUpdaters {
//   static logger = new Logger('ViewUpdaters');
//   /* Creating a new Map object. */
//   private static updaters = new Map<string, Type<IViewUpdater<IEvent>>>();

//   /**
//    * `add` is a static function that takes a string and a Type<IViewUpdater<IEvent>> and adds it to
//    * the updaters map.
//    *
//    * @param name  - (string) - The name of the updater. This is the name that will be used in the
//    * view definition.
//    * @param handler  - () - Type<IViewUpdater<IEvent>>
//    *
//    */
//   static add(name: string, handler: Type<IViewUpdater<IEvent>>) {
//     this.logger.verbose('add');
//     ViewUpdaters.updaters.set(name, handler);
//   }

//   /**
//    * It returns a class that implements the `IViewUpdater<IEvent>` interface.
//    *
//    * @param name  - (string) - The name of the view updater.
//    * @returns A Type<IViewUpdater<IEvent>>
//    *
//    */
//   static get(name: string): Type<IViewUpdater<IEvent>> {
//     this.logger.verbose('get');
//     return ViewUpdaters.updaters.get(name);
//   }
// }

export class ViewUpdaters {
  static logger = new Logger('ViewUpdaters');
  /* Creating a new Map object. */
  // private static updaters = new Map<string, Type<IViewUpdater<IEvent>>>();
  private static updaters: {
    name: string;
    metadataKey: string;
    handler: Type<IViewUpdater<IEvent>>;
  }[] = [];

  /**
   * `add` is a static function that takes a string and a Type<IViewUpdater<IEvent>> and adds it to
   * the updaters map.
   *
   * @param name  - (string) - The name of the updater. This is the name that will be used in the
   * view definition.
   * @param handler  - () - Type<IViewUpdater<IEvent>>
   *
   */
  static add(
    metadataKey: string,
    name: string,
    handler: Type<IViewUpdater<IEvent>>,
  ) {
    this.logger.verbose('add');
    ViewUpdaters.updaters.push({ metadataKey, handler, name });
  }

  /**
   * It returns a class that implements the `IViewUpdater<IEvent>` interface.
   *
   * @param name  - (string) - The name of the view updater.
   * @returns A Type<IViewUpdater<IEvent>>
   *
   */
  static get(name: string): Type<IViewUpdater<IEvent>> {
    this.logger.verbose('get');
    const event = ViewUpdaters.updaters.find((el) => el.name === name);
    return event ? event.handler : undefined;
  }
}
