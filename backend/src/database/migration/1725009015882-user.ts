import { MigrationInterface, QueryRunner } from "typeorm";

export class User1725009015882 implements MigrationInterface {
    name = 'User1725009015882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying(126)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying(126)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_image_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "background_image_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "background_image_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_image_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
    }

}
