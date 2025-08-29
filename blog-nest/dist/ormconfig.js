"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const path = require("path");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
const config = {
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
const AppDataSource = new typeorm_1.DataSource(config);
exports.AppDataSource = AppDataSource;
exports.default = config;
//# sourceMappingURL=ormconfig.js.map