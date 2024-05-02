import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from './integrations/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
