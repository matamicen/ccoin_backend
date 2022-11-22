import {MigrationInterface, QueryRunner} from "typeorm";

export class tokensTable1668622922452 implements MigrationInterface {
    name = 'tokensTable1668622922452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "public_key" character varying NOT NULL, "address" character varying NOT NULL, "challenge" character varying NOT NULL, "login_date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
