import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RediskModule } from 'redisk-nestjs';
import { EventSourcingModule } from '@eventsource/index';
import { HeroesGameModule } from './heroes/heroes.module';
import { HeroGameModule } from './hero/heroes.module';

@Module({
  imports: [
    UsersModule,
    HeroesGameModule,
    HeroGameModule,
    RediskModule.forRoot({
      url: process.env.REDIS_URL,
    }),
    EventSourcingModule.forRoot({
      mongoURL: process.env.MONGO_URL,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
