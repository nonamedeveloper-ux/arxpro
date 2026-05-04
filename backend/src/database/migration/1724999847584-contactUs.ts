import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactUs1724999847584 implements MigrationInterface {
    name = 'ContactUs1724999847584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_us" ADD "linkedin_link" character varying`);
        await queryRunner.query(`ALTER TABLE "contact_us" ADD "twitter_link" character varying`);
        await queryRunner.query(`ALTER TABLE "contact_us" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_us" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "contact_us" DROP COLUMN "twitter_link"`);
        await queryRunner.query(`ALTER TABLE "contact_us" DROP COLUMN "linkedin_link"`);
    }

}
