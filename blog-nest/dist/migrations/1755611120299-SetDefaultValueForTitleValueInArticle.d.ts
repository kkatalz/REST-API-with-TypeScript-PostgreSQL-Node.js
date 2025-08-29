import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SetDefaultValueForTitleValueInArticle1755611120299 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
