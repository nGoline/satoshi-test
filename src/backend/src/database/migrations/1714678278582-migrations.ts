import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714678278582 implements MigrationInterface {
  name = 'InitialMigration1714678278582'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS citext;

      CREATE TABLE IF NOT EXISTS public."users" (
          "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
          "email" citext NOT NULL,
          "password" character varying(255) NOT NULL,
          "username" citext NOT NULL DEFAULT substring(md5(random()::text), 0, 12),
          CONSTRAINT "pk_users_id" PRIMARY KEY ("id"),
          CONSTRAINT "uq_users_email" UNIQUE ("email"),
          CONSTRAINT "uq_users_username" UNIQUE ("username")
      );

      CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");
      CREATE INDEX IF NOT EXISTS "idx_users_username" ON "users" ("username");    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "idx_users_email";
      DROP INDEX "idx_users_username";
      DROP TABLE "users";
      DROP EXTENSION citext;
    `);
  }

}
