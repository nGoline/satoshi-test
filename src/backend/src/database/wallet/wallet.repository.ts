import { Injectable } from "@nestjs/common";
import { WalletEntity } from "./wallet.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class WalletRepository {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletRepository: Repository<WalletEntity>,
    ) { }

    public manager = this.walletRepository.manager;

    async createWallet(userId: string, balance: number): Promise<WalletEntity> {
        const wallet = this.walletRepository.create({ userId, balance });
        return this.walletRepository.save(wallet);
    }

    async findOneByUserId(userId: string): Promise<WalletEntity | undefined> {
        return this.walletRepository.findOne({ where: { userId } });
    }

    async updateBalance(userId: string, balance: number): Promise<WalletEntity> {
        const wallet = await this.findOneByUserId(userId);
        wallet.balance = balance;
        return this.walletRepository.save(wallet);
    }

    async getBalance(walletId: string): Promise<number> {
        const wallet = await this.walletRepository.findOne({
            where: { id: walletId }
        });

        if (!wallet) {
            throw new Error(`Wallet with id ${walletId} not found`);
        }

        return wallet.balance;
    }
}