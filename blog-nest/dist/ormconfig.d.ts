import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
declare const config: PostgresConnectionOptions;
declare const AppDataSource: DataSource;
export { AppDataSource };
export default config;
