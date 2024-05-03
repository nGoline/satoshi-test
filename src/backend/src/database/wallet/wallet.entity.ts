import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('wallets')
export class WalletEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    balance: number;
}