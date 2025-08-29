import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class SetDefaultValueForDescriptionValueInArticle1755610974444 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
