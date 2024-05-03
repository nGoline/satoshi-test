import { Injectable, Logger } from '@nestjs/common';
import { WalletEntity } from 'src/database/wallet/wallet.entity';
import { WalletRepository } from 'src/database/wallet/wallet.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    private walletRepository: WalletRepository,
  ) { }

  private readonly logger = new Logger(WalletService.name);

  async createWallet(userId: string, balance: number) {
    return this.walletRepository.createWallet(userId, balance);
  }

  async sendTokens(senderId: string, receiverId: string, amount: number): Promise<number> {
    return this.walletRepository.manager.transaction(async (entityManager: EntityManager) => {
      // Lock the sender row using a pessimistic write lock
      const senderWallet = await entityManager.findOne(WalletEntity, {
        where: { id: senderId },
        lock: { mode: 'pessimistic_write' }
      });

      if (senderWallet.balance - amount < 0) {
        throw new Error('Insufficient balance');
      }

      // Lock the receiver row using a pessimistic write lock
      const receiverWallet = await entityManager.findOne(WalletEntity, {
        where: { id: receiverId },
        lock: { mode: 'pessimistic_write' }
      });

      // Update the sender and receiver balances
      senderWallet.balance -= amount;
      receiverWallet.balance += amount;

      // Save the changes and release the locks
      await entityManager.save(senderWallet);
      await entityManager.save(receiverWallet);

      return senderWallet.balance;
    });
  }

  async getBalance(walletId: string): Promise<number> {
    return this.walletRepository.getBalance(walletId);
  }

  async getWalletByUserId(userId: string) {
    return this.walletRepository.findOneByUserId(userId);
  }
}
