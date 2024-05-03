import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714740120809 implements MigrationInterface {
    name = 'AddWalletsAndTransactions1714740120809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public."wallets" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "balance" integer NOT NULL,
                CONSTRAINT "pk_wallets_id" PRIMARY KEY ("id"),
                CONSTRAINT "fk_wallets_userId_users_id" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS "idx_wallets_userId" ON "wallets" ("id");

            CREATE TYPE "transaction_status_enum" AS ENUM('pending', 'completed', 'failed');
            
            CREATE TABLE IF NOT EXISTS "transactions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "senderWalletId" uuid NOT NULL,
                "receiverWalletId" uuid NOT NULL,
                "amount" integer NOT NULL,
                "status" "transaction_status_enum" NOT NULL DEFAULT 'pending',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "pk_transactions_id" PRIMARY KEY ("id"),
                CONSTRAINT "fk_transactions_senderWalletId_wallets_id" FOREIGN KEY ("senderWalletId") REFERENCES "wallets"("id") ON DELETE CASCADE,
                CONSTRAINT "fk_transactions_receiverWalletId_wallets_id" FOREIGN KEY ("receiverWalletId") REFERENCES "wallets"("id") ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS "idx_transactions_senderWalletId" ON "transactions" ("senderWalletId");
            CREATE INDEX IF NOT EXISTS "idx_transactions_receiverWalletId" ON "transactions" ("receiverWalletId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "idx_transactions_senderWalletId";
            DROP INDEX "idx_transactions_receiverWalletId";
            DROP TABLE "transactions";
            DROP TYPE "transaction_status_enum"

            DROP INDEX "idx_wallets_userId";
            DROP TABLE "wallets";
        `);
    }

}
