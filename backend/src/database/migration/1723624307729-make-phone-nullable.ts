import { MigrationInterface, QueryRunner } from "typeorm";

export class MakePhoneNullable1723624307729 implements MigrationInterface {
    name = 'MakePhoneNullable1723624307729';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
    }
}
