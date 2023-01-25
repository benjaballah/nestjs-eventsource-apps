import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services';

/**
 * Create an instance of the AppModule and listen on port 3000..
 *
 *
 */
async function bootstrap() {
  const logger = new Logger('');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log(`App start  ${await app.getUrl()}`);
}
bootstrap();
