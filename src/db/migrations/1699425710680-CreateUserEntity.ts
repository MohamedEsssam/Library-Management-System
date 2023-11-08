import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserEntity1699425710680 implements MigrationInterface {
    name = 'CreateUserEntity1699425710680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL DEFAULT '01HEPTMXVVGGQ80X64STTFRZQN', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
