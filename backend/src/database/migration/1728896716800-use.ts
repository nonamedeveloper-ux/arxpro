import { MigrationInterface, QueryRunner } from "typeorm";

export class Use1728896716800 implements MigrationInterface {
    name = 'Use1728896716800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_57d123b442480383db4382be65b"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_d5f61ba643f55efb66ca189331a"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "REL_57d123b442480383db4382be65"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "architektor_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bookmarks" character varying`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "views_count" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "is_top" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "name" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "REL_d5f61ba643f55efb66ca189331"`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "floor_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "floor_data" json NOT NULL, "project_id" uuid NOT NULL, CONSTRAINT "PK_floor_data" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "floor_data" DROP COLUMN "floor_data"`);
        await queryRunner.query(`ALTER TABLE "floor_data" ADD "floor_data" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "floor_data" DROP COLUMN "floor_data"`);
        await queryRunner.query(`ALTER TABLE "floor_data" ADD "floor_data" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "REL_d5f61ba643f55efb66ca189331" UNIQUE ("project_video_id")`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "is_top"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "views_count"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bookmarks"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "architektor_id" uuid`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "REL_57d123b442480383db4382be65" UNIQUE ("architektor_id")`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_d5f61ba643f55efb66ca189331a" FOREIGN KEY ("project_video_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_57d123b442480383db4382be65b" FOREIGN KEY ("architektor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
