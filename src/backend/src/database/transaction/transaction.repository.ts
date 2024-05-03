import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "./transaction.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TransactionRepository {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) { }

    async createTransaction(senderId: string, receiverId: string, amount: number): Promise<TransactionEntity> {
        const transaction = this.transactionRepository.create({ senderId, receiverId, amount });
        return this.transactionRepository.save(transaction);
    }

    async updateTransaction(transactionId: string, status: number): Promise<TransactionEntity> {
        const transaction = await this.transactionRepository.findOne({
            where: { id: transactionId },
        });
        transaction.status = status;
        return this.transactionRepository.save(transaction);
    }

    async findTransactionsByWalletId(walletId: string): Promise<TransactionEntity[]> {
        return this.transactionRepository.find({ where: { senderId: walletId } });
    }
}