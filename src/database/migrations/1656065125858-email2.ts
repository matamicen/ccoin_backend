import {MigrationInterface, QueryRunner} from "typeorm";

export class email21656065125858 implements MigrationInterface {
    name = 'email21656065125858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "email2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "email2"`);
    }

}
