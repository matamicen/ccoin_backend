import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      //   host: process.env.DB_HOST,
      //   port: parseInt(process.env.DB_PORT, 10),
      host: 'localhost',
      port: 5432,
      //username: process.env.DB_USERNAME,
      //database: process.env.DB_NAME,
      //password: process.env.DB_PASSWORD,
      username: 'admin',
      database: 'blackprop',
      password: 'postgres',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      //   cli: {
      //     migrationsDir: __dirname + '/../database/migrations',
      //   },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  //   type: 'mysql',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  database: 'blackprop',
  password: 'postgres',
  //   host: process.env.DB_HOST,
  //   port: parseInt(process.env.DB_PORT, 10),
  //   username: process.env.DB_USERNAME,
  //   database: process.env.DB_NAME,
  //   password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  //   cli: {
  //     migrationsDir: __dirname + '/../database/migrations',
  //   },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};
