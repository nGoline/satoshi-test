import { Module } from '@nestjs/common';
import { WalletDatabaseModule } from 'src/database/wallet/wallet.module';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
    imports: [WalletDatabaseModule, TransactionModule],
    providers: [WalletService],
    controllers: [WalletController],
    exports: [WalletService]
})
export class WalletModule { }