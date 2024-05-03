import { Module } from '@nestjs/common';
import { WalletDatabaseModule } from 'src/database/wallet/wallet.module';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
    imports: [WalletDatabaseModule],
    providers: [WalletService],
    controllers: [WalletController],
    exports: [WalletService]
})
export class WalletModule { }