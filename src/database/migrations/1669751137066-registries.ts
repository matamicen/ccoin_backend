import {MigrationInterface, QueryRunner} from "typeorm";

export class registries1669751137066 implements MigrationInterface {
    name = 'registries1669751137066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "instructions" character varying NOT NULL, CONSTRAINT "PK_414eba74fdd10096bfda34f495f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "thumbnail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "cover" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "project_registration" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "credit_start" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "credit_end" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "credits_minted" integer`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "credits_burned" integer`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "credits_remaining" integer`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD "registryId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."projects" ADD CONSTRAINT "FK_0974004ca4ef446f7040c7e24d6" FOREIGN KEY ("registryId") REFERENCES "registries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP CONSTRAINT "FK_0974004ca4ef446f7040c7e24d6"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "registryId"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "credits_remaining"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "credits_burned"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "credits_minted"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "credit_end"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "credit_start"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "project_registration"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "cover"`);
        await queryRunner.query(`ALTER TABLE "public"."projects" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`DROP TABLE "registries"`);
    }

}
