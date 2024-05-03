import { Module } from '@nestjs/common';
import { TransactionDatabaseModule } from 'src/database/transaction/transaction.module';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TransactionDatabaseModule],
    providers: [TransactionService],
    exports: [TransactionService],
})
export class TransactionModule { }