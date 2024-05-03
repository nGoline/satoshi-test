import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import pinoConfig from './pino.config';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        pinoConfig
      ],
    }),
  ],
  providers: [],
  controllers: [],
  exports: [ConfigModule],
})
export class ConfigModule { }
