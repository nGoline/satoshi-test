import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
      ],
    }),
  ],
  providers: [],
  controllers: [],
  exports: [ConfigModule],
})
export class ConfigModule { }
