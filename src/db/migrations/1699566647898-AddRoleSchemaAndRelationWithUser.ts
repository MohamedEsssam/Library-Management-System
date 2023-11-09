import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleSchemaAndRelationWithUser1699566647898 implements MigrationInterface {
    name = 'AddRoleSchemaAndRelationWithUser1699566647898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('ADMIN', 'BORROWER')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" "public"."role_name_enum" NOT NULL DEFAULT 'BORROWER', CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae4578dcaed5adff96595e6166" ON "role" ("name") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_85c8d63d50f8e617e2a4917671" ON "book" ("author") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd183604b9c828c0bdd92cafab" ON "book" ("isbn") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd183604b9c828c0bdd92cafab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85c8d63d50f8e617e2a4917671"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae4578dcaed5adff96595e6166"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    }

}
