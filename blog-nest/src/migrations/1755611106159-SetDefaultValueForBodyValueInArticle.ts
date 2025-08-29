import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForBodyValueInArticle1755611106159 implements MigrationInterface {
    name = 'SetDefaultValueForBodyValueInArticle1755611106159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`);
    }

}
