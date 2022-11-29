import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1669735157408 implements MigrationInterface {
  name = 'init1669735157408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sdgs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "goal" integer NOT NULL, "description" character varying NOT NULL, "image_url" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_bbfcd883cac4576cc1fe2d0122b" UNIQUE ("goal"), CONSTRAINT "PK_91029f717e12956b90440f88a65" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "serial" character varying NOT NULL, "project_url" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_2fc965564d9ed415c6731a30281" UNIQUE ("serial"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "public_key" character varying NOT NULL, "address" character varying NOT NULL, "challenge" character varying NOT NULL, "login_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "lastname" character varying, "email" character varying, "password" character varying, "public_address" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects_sdgs" ("project_id" uuid NOT NULL, "sdgd_id" uuid NOT NULL, CONSTRAINT "PK_4c91ecc20a87c2cdcd7b0ec7c2c" PRIMARY KEY ("project_id", "sdgd_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_24a00130e55335c9c15bd7d79d" ON "projects_sdgs" ("project_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6795a67874d2b7c880152be1fe" ON "projects_sdgs" ("sdgd_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_sdgs" ADD CONSTRAINT "FK_24a00130e55335c9c15bd7d79d6" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_sdgs" ADD CONSTRAINT "FK_6795a67874d2b7c880152be1fe5" FOREIGN KEY ("sdgd_id") REFERENCES "sdgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects_sdgs" DROP CONSTRAINT "FK_6795a67874d2b7c880152be1fe5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_sdgs" DROP CONSTRAINT "FK_24a00130e55335c9c15bd7d79d6"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_6795a67874d2b7c880152be1fe"`);
    await queryRunner.query(`DROP INDEX "IDX_24a00130e55335c9c15bd7d79d"`);
    await queryRunner.query(`DROP TABLE "projects_sdgs"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tokens"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "sdgs"`);
  }
}
