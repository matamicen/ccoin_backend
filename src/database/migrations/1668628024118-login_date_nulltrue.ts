import {MigrationInterface, QueryRunner} from "typeorm";

export class loginDateNulltrue1668628024118 implements MigrationInterface {
    name = 'loginDateNulltrue1668628024118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" ALTER COLUMN "login_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."tokens" ALTER COLUMN "login_date" SET NOT NULL`);
    }

}
