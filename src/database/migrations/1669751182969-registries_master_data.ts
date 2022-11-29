import {MigrationInterface, QueryRunner} from "typeorm";

export class registriesMasterData1669751182969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "registries"("id", "name", "description", "instructions") VALUES (DEFAULT, 'BME', '', 'BME instructions')`);
        await queryRunner.query(`INSERT INTO "registries"("id", "name", "description", "instructions") VALUES (DEFAULT, 'CDM', '', 'CDM instructions')`);
        await queryRunner.query(`INSERT INTO "registries"("id", "name", "description", "instructions") VALUES (DEFAULT, 'Ecoregistry', '', 'Ecoregistry instructions')`);
        await queryRunner.query(`INSERT INTO "registries"("id", "name", "description", "instructions") VALUES (DEFAULT, 'Gold Standard', '', 'Gold Standard instructions')`);
        await queryRunner.query(`INSERT INTO "registries"("id", "name", "description", "instructions") VALUES (DEFAULT, 'Verra', '', 'Verra instructions')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
