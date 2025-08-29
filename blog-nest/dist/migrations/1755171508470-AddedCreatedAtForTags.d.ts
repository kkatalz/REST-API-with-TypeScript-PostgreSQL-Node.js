import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddedCreatedAtForTags1755171508470 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
