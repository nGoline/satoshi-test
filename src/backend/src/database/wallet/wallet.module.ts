import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletEntity } from "./wallet.entity";
import { WalletRepository } from "./wallet.repository";

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    providers: [WalletRepository],
    exports: [WalletRepository],
})
export class WalletDatabaseModule { }