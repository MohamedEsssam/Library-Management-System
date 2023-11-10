import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBorrowingSchemaAndRelationBetweenBookAndBorrower1699581403231 implements MigrationInterface {
    name = 'AddBorrowingSchemaAndRelationBetweenBookAndBorrower1699581403231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "borrowing" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "dueDate" TIMESTAMP NOT NULL, "returned" boolean NOT NULL DEFAULT false, "bookId" character varying, "borrowerId" character varying, CONSTRAINT "PK_5bfeaa4e275c1a2e2ab257f2ee2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrowing" ADD CONSTRAINT "FK_6d4de218bbdb605c1d33de6242f" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrowing" ADD CONSTRAINT "FK_d7d786b8e6f5f02a85d3fff05dc" FOREIGN KEY ("borrowerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrowing" DROP CONSTRAINT "FK_d7d786b8e6f5f02a85d3fff05dc"`);
        await queryRunner.query(`ALTER TABLE "borrowing" DROP CONSTRAINT "FK_6d4de218bbdb605c1d33de6242f"`);
        await queryRunner.query(`DROP TABLE "borrowing"`);
    }

}
