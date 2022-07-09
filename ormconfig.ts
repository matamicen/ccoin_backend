import * as dotenv from 'dotenv';
// dotenv.config({ path: __dirname + '/.env' });
console.log('matiassssssss');
console.log(process.env.DATABASE_TYPE);
console.log(process.env.DATABASE_PORT);
console.log(process.env.DATABASE_HOST);
// let host = process.env.DATABASE_HOST;
if (process.env.DATABASE_HOST == undefined) {
  console.log('es undefined');
  dotenv.config({ path: __dirname + '/.envlocalormconfig_postgres' });
  // host = 'localhost';
}
export = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
