import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'devuser',
  password: '******',
  database: 'blog',
  entities: [__dirname + '/**/*.entity.{.ts, .js}'],
  synchronize: true, // don't use on production
};

export default config;
