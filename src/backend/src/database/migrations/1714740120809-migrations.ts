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

            CREATE TABLE IF NOT EXISTS "transactions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "senderId" uuid NOT NULL,
                "receiverId" uuid NOT NULL,
                "amount" integer NOT NULL,
                "status" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "pk_transactions_id" PRIMARY KEY ("id"),
                CONSTRAINT "fk_transactions_senderId_users_id" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "fk_transactions_receiverId_users_id" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS "idx_transactions_senderId" ON "transactions" ("senderId");
            CREATE INDEX IF NOT EXISTS "idx_transactions_receiverId" ON "transactions" ("receiverId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "idx_transactions_senderId";
            DROP INDEX "idx_transactions_receiverId";
            DROP TABLE "transactions";

            DROP INDEX "idx_wallets_userId";
            DROP TABLE "wallets";
        `);
    }

}
