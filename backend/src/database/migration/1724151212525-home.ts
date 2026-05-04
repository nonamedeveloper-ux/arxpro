import { MigrationInterface, QueryRunner } from "typeorm";

export class Home1724151212525 implements MigrationInterface {
    name = 'Home1724151212525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "home_title" ADD "filePath" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "home_title" DROP COLUMN "filePath"`);
    }

}
