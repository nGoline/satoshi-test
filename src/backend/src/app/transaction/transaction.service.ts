import { Injectable, Logger } from '@nestjs/common';
import { TransactionStatus } from 'src/database/transaction/transaction.entity';
import { TransactionRepository } from 'src/database/transaction/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
  ) { }

  private readonly logger = new Logger(TransactionService.name);

  async createTransaction(senderId: string, receiverId: string, amount: number) {
    try {
      return this.transactionRepository.createTransaction(senderId, receiverId, amount);
    } catch (error) {
      this.logger.error(`Error creating Transaction: ${error}`);
      console.log(error);
    }
  }

  async updateTransaction(transactionId: string, status: TransactionStatus) {
    try {
      return this.transactionRepository.updateTransaction(transactionId, status);
    } catch (error) {
      this.logger.error(`Error updating Transaction: ${error}`);
      console.log(error);
    }
  }

  async getTransactionsByWalletId(walletId: string) {
    try {
      return this.transactionRepository.findTransactionsByWalletId(walletId);
    } catch (error) {
      this.logger.error(`Error getting Transactions by Wallet ID ${walletId}: ${error}`);
      console.log(error);
    }
  }
}
