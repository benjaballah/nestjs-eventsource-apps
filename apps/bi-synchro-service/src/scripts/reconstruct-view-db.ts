import { Script } from './script';
import { INestApplication } from '@nestjs/common';
import { ReconstructViewDb } from '@eventsource/index';

Script.run(async (app: INestApplication) => {
  await ReconstructViewDb.run(app);
});
