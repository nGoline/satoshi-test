import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from './integrations/typeorm/typeorm.module';
import { WalletModule } from './app/wallet/wallet.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule, Params as PinoOptions } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    EventEmitterModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pinoOptions = configService.get<PinoOptions>('pino');
        if (!pinoOptions) {
          throw new Error('Pino configuration not found');
        }
        return pinoOptions;
      },
    }),
    UserModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
