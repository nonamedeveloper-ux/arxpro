import { MigrationInterface, QueryRunner } from "typeorm";

export class Commnet1725584934765 implements MigrationInterface {
    name = 'Commnet1725584934765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "post_id" uuid NOT NULL, "parent_id" uuid, "author_id" uuid NOT NULL, "nick_name" character varying(126), "profile_image_path" character varying, "parentId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
