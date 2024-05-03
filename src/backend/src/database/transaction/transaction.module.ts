import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "./transaction.entity";
import { TransactionRepository } from "./transaction.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    providers: [TransactionRepository],
    exports: [TransactionRepository],
})
export class TransactionDatabaseModule { }