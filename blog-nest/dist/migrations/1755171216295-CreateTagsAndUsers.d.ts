import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateTagsAndUsers1755171216295 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
