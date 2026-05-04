import { MigrationInterface, QueryRunner } from "typeorm";

export class ArchitectureUpdate1724137274396 implements MigrationInterface {
    name = 'ArchitectureUpdate1724137274396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architektors" ALTER COLUMN "plan_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architektors" ALTER COLUMN "plan_id" SET NOT NULL`);
    }

}
