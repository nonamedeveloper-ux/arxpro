import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1723624307728 implements MigrationInterface {
  name = 'First1723624307728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying(126) NOT NULL, "password" text NOT NULL, "nick_name" character varying(126), "role" character varying(128) NOT NULL, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "regions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "file_path" text NOT NULL, "name" character varying(256), "mimetype" text NOT NULL, "size" integer NOT NULL, "description" text, "projectsId" uuid, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_826c5e0f45e35b5983c8379be7b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "price" bigint NOT NULL, "like" bigint NOT NULL, "dislike" bigint NOT NULL, "architektor_id" uuid, "project_video_id" uuid, "project_image_id" uuid, "category_id" uuid, CONSTRAINT "REL_57d123b442480383db4382be65" UNIQUE ("architektor_id"), CONSTRAINT "REL_d5f61ba643f55efb66ca189331" UNIQUE ("project_video_id"), CONSTRAINT "REL_982473db2a2e3db496909dd84e" UNIQUE ("project_image_id"), CONSTRAINT "REL_c1345700580c6c6b17200647bc" UNIQUE ("category_id"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "subtitle" character varying, "description" text NOT NULL, "views_count" bigint DEFAULT '0', "file_id" uuid, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "price" integer NOT NULL, "year_price" integer NOT NULL, "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "description" text NOT NULL, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "like_and_dislike" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "like" text, "dislike" text, "architektor_id" character varying, "project_id" character varying, CONSTRAINT "PK_b5807abf73fac879c76017ee711" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "districts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "region_id" character varying NOT NULL, CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "home_title" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "description" text NOT NULL, "file_id" uuid NOT NULL, CONSTRAINT "PK_5d09d319327f5e92852606a1302" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "architektors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "nick_name" character varying(128) NOT NULL, "first_name" character varying(126) NOT NULL, "last_name" character varying(126) NOT NULL, "middle_name" character varying(126) NOT NULL, "birth_date" date NOT NULL, "about_me" text NOT NULL, "email" text NOT NULL, "user_id" character varying NOT NULL, "plan_id" character varying NOT NULL, "profile_image_id" character varying NOT NULL, "background_image_id" character varying NOT NULL, "district_id" character varying NOT NULL, "instagram" text, "telegram" text NOT NULL, "youtube" text, "tiktok" text, "facebook" text, "raiting" integer, "views_count" bigint, "is_top" boolean DEFAULT false, CONSTRAINT "UQ_858db2ace49b47b538c3a16a5d8" UNIQUE ("nick_name"), CONSTRAINT "UQ_746ce3fd943fbe417fff445ec5f" UNIQUE ("user_id"), CONSTRAINT "UQ_0c3d82b38b047334ed62e738d43" UNIQUE ("profile_image_id"), CONSTRAINT "UQ_3bbf487d2d02d4e461be2044f4e" UNIQUE ("district_id"), CONSTRAINT "PK_db57ffe9286cdea1edcf1de6a95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "description" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "about_us_description" text NOT NULL, "projects_description" text NOT NULL, "happy_customer_description" text NOT NULL, "our_architektor_description" text NOT NULL, "subscribe_description" text NOT NULL, "statistic_description" text NOT NULL, "plans_description" text, CONSTRAINT "PK_313ee7159517cb494d532ee5466" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(126) NOT NULL, "last_name" character varying(126) NOT NULL, "user_id" character varying NOT NULL, "file_id" character varying, CONSTRAINT "UQ_2b901dd818a2a6486994d915a68" UNIQUE ("user_id"), CONSTRAINT "UQ_e048e64ca4bbe1b8a6fc347d38b" UNIQUE ("file_id"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_57d123b442480383db4382be65b" FOREIGN KEY ("architektor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_d5f61ba643f55efb66ca189331a" FOREIGN KEY ("project_video_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_982473db2a2e3db496909dd84e9" FOREIGN KEY ("project_image_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_c1345700580c6c6b17200647bcc" FOREIGN KEY ("category_id") REFERENCES "project_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_c1345700580c6c6b17200647bcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_982473db2a2e3db496909dd84e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_d5f61ba643f55efb66ca189331a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_57d123b442480383db4382be65b"`,
    );
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TABLE "description"`);
    await queryRunner.query(`DROP TABLE "architektors"`);
    await queryRunner.query(`DROP TABLE "home_title"`);
    await queryRunner.query(`DROP TABLE "districts"`);
    await queryRunner.query(`DROP TABLE "like_and_dislike"`);
    await queryRunner.query(`DROP TABLE "menu"`);
    await queryRunner.query(`DROP TABLE "plans"`);
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "project_category"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "regions"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
