import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateFollowsTable1756200788202 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
