import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookSchema1699554162491 implements MigrationInterface {
    name = 'AddBookSchema1699554162491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "author" character varying NOT NULL, "isbn" character varying NOT NULL, "availableQuantity" integer NOT NULL, "shelfLocation" character varying NOT NULL, CONSTRAINT "UQ_c10a44a29ef231062f22b1b7ac5" UNIQUE ("title"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c10a44a29ef231062f22b1b7ac" ON "book" ("title") `);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '01HEPTMXVVGGQ80X64STTFRZQN'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c10a44a29ef231062f22b1b7ac"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
