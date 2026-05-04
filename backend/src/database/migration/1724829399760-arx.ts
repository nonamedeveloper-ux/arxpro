import { MigrationInterface, QueryRunner } from "typeorm";

export class Arx1724829399760 implements MigrationInterface {
    name = 'Arx1724829399760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architektors" ADD "category" character varying`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_eb1b1dd643e5e5e63d3706ed153" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_eb1b1dd643e5e5e63d3706ed153"`);
        await queryRunner.query(`ALTER TABLE "architektors" DROP COLUMN "category"`);
    }

}
