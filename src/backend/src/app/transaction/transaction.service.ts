import { Injectable, Logger } from '@nestjs/common';
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

  async updateTransaction(transactionId: string, status: number) {
    return this.transactionRepository.updateTransaction(transactionId, status);
  }
}
