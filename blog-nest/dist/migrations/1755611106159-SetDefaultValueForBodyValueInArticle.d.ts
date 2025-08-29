import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SetDefaultValueForBodyValueInArticle1755611106159 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
