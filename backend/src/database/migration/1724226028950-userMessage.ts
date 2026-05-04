import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMessage1724226028950 implements MigrationInterface {
    name = 'UserMessage1724226028950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscribers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(126), "user_id" character varying NOT NULL, CONSTRAINT "UQ_0c99e87bda40ab7c44e49e88ef8" UNIQUE ("user_id"), CONSTRAINT "PK_cbe0a7a9256c826f403c0236b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(126) NOT NULL, "last_name" character varying(126) NOT NULL, "email" character varying NOT NULL, "message" text NOT NULL, CONSTRAINT "PK_ade2c9df16283b1115688c8b714" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126) NOT NULL, "room_size" character varying NOT NULL, "floor_id" uuid NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "floor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126) NOT NULL, "project_id" uuid NOT NULL, CONSTRAINT "PK_16a0823530c5b0dd226b8a96ee1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_us" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying(126) NOT NULL, "email" character varying NOT NULL, "location" character varying NOT NULL, "instagram_link" character varying, "telegram_link" character varying, "facebook_link" character varying, "youtube_link" character varying, "tiktok_link" character varying, CONSTRAINT "PK_b61766a4d93470109266b976cfe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact_us"`);
        await queryRunner.query(`DROP TABLE "floor"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "user_message"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
    }

}
