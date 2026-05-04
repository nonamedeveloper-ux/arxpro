import { MigrationInterface, QueryRunner } from "typeorm";

export class Comment1725620672186 implements MigrationInterface {
    name = 'Comment1725620672186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "profile_image_path"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "nick_name"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "architektor_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "architektor_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "nick_name" character varying(126)`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "profile_image_path" character varying`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "author_id" uuid NOT NULL`);
    }

}
