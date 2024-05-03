import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [UserModule, WalletModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
