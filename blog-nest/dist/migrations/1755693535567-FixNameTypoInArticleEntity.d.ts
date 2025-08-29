import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FixNameTypoInArticleEntity1755693535567 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
