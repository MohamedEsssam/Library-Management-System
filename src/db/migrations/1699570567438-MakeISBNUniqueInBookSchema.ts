import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeISBNUniqueInBookSchema1699570567438 implements MigrationInterface {
    name = 'MakeISBNUniqueInBookSchema1699570567438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7"`);
    }

}
