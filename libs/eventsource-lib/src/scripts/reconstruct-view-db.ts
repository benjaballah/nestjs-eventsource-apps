import { INestApplication, Logger } from '@nestjs/common';
import { EventStore } from '../eventstore';
import { ViewUpdater } from '../view/view-updater';

export class ReconstructViewDb {
  static logger = new Logger('ReconstructViewDb');

  /**
   * It waits until the event store is fully launched, then it gets all the events from the event
   * store and applies them to the view db.
   *
   * @param app  - (INestApplication) - INestApplication - the NestJS application instance
   *
   */
  static async run(app: INestApplication) {
    this.logger.verbose('run');
    const sleep = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const eventStore = app.get(EventStore);
    const viewUpdater = app.get(ViewUpdater);

    while (!eventStore.isInitiated()) {
      // We wait until the event store is fully launched
      await sleep(100);
    }
    let event;
    let index = 0;

    while ((event = await eventStore.getEvent(index))) {
      await viewUpdater.run(event);
      index++;
    }

    this.logger.log('View db has been restored!');
  }
}
