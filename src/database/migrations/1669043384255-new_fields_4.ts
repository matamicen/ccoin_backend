import {MigrationInterface, QueryRunner} from "typeorm";

export class newFields41669043384255 implements MigrationInterface {
    name = 'newFields41669043384255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" DROP COLUMN "created_at"`);
    }

}
