import {MigrationInterface, QueryRunner} from "typeorm";

export class init1657999578995 implements MigrationInterface {
    name = 'init1657999578995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "email_a" TO "email11"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" RENAME COLUMN "email11" TO "email_a"`);
    }

}
