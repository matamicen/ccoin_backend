import {MigrationInterface, QueryRunner} from "typeorm";

export class passwordNotnull1667122889409 implements MigrationInterface {
    name = 'passwordNotnull1667122889409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "password"`);
    }

}
