// export { EventsHandler as ViewUpdaterHandler } from '@nestjs/cqrs';
import { EventsHandler, IEvent } from '@nestjs/cqrs';
import { ViewUpdaters } from '../view-updaters';
import { Logger, Type } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

/**
 * It takes a class that implements the IEvent interface and adds it to the ViewUpdaters map.
 *
 * @param event  - () - Type<IEvent>
 * @returns A function that takes a target and adds it to the ViewUpdaters map.
 *
 */
// export function ViewUpdaterHandler(event: Type<IEvent>) {
//   new Logger('function').verbose('ViewUpdaterHandler');
//   EventsHandler(event.name);
//   return (target: any) => {
//     ViewUpdaters.add(event.name, target);
//   };
// }

export function ViewUpdaterHandler(...events: Type<IEvent>[]) {
  new Logger('function').verbose('ViewUpdaterHandler');
  return (target) => {
    events.forEach((event) => {
      if (!Reflect.hasOwnMetadata('__event__', event)) {
        Reflect.defineMetadata('__event__', { id: uuid() }, event);
      }
      ViewUpdaters.add('__eventsHandler__', event.name, target);
    });
    Reflect.defineMetadata('__eventsHandler__', events, target);
  };
}
