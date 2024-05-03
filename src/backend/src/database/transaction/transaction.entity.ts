import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TransactionStatus {
    Pending = 'pending',
    Completed = 'completed',
    Failed = 'failed'
}

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    senderWalletId: string;

    @Column()
    receiverWalletId: string;

    @Column()
    amount: number;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.Pending
    })
    status: TransactionStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}