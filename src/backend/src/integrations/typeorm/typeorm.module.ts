import { Module } from '@nestjs/common';
import { TypeOrmModule as NestJsTypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    NestJsTypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const typeOrmOptions =
          configService.get<PostgresConnectionOptions>('database');

        if (!typeOrmOptions)
          throw new Error('Database configuration not found');

        return typeOrmOptions;
      },
    }),
  ],
  providers: [],
  controllers: [],
  exports: [NestJsTypeOrmModule],
})
export class TypeOrmModule { }
