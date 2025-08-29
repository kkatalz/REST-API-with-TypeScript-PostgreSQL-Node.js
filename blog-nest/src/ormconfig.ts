import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname, '/migrations/**/*.ts')],
};

const AppDataSource = new DataSource(config);

export { AppDataSource };

export default config;
