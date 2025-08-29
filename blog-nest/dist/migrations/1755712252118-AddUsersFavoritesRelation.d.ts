import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUsersFavoritesRelation1755712252118 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
