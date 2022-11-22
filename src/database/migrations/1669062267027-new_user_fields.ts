import {MigrationInterface, QueryRunner} from "typeorm";

export class newUserFields1669062267027 implements MigrationInterface {
    name = 'newUserFields1669062267027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "email2"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "email11"`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "public_address" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "lastname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "public_address"`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "email11" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "email2" character varying`);
    }

}
