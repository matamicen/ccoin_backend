import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertSdgs1669735187733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '1', 'No Poverty', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/02/goal1-150x150.png', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '2', 'Zero Hunger', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/02/2-1-e1456438915463.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '3', 'Good Health and Well-being', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/3-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '4', 'Quality Education', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/4-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '5', 'Gender Equality', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/5-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '6', 'Clean Water and Sanitation', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/6-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '7', 'Affordable and Clean Energy', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/7-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '8', 'Decent Work and Economic Growth', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/8-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '9', 'Industry, Innovation and Infrastructure', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/9-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '10', 'Reduced Inequality', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/10-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '11', 'Sustainable Cities and Communities', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/11-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '12', 'Responsible Consumption and Production', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/12.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '13', 'Climate Action', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/13-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '14', 'Life Below Water', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/14-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '15', 'Life on Land', 'https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2016/03/15-300x300.jpg', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '16', 'Peace and Justice Strong Institutions', 'https://www.un.org/development/desa/disabilities/envision2030-goal16.html', DEFAULT, DEFAULT)`,
    );
    await queryRunner.query(
      `INSERT INTO "sdgs"("id", "goal", "description", "image_url", "created_at", "updated_at") VALUES (DEFAULT, '17', 'Partnerships to achieve the Goal', 'https://www.un.org/development/desa/disabilities/envision2030-goal17.html', DEFAULT, DEFAULT)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
