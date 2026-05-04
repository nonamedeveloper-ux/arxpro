import { MigrationInterface, QueryRunner } from "typeorm";

export class Arxpro1724163440000 implements MigrationInterface {
    name = 'Arxpro1724163440000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architektors" DROP CONSTRAINT "UQ_3bbf487d2d02d4e461be2044f4e"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architektors" ADD CONSTRAINT "UQ_3bbf487d2d02d4e461be2044f4e" UNIQUE ("district_id")`);
    }

}
