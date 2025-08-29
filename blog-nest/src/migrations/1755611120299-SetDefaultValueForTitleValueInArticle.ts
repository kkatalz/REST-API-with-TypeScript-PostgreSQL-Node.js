import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForTitleValueInArticle1755611120299 implements MigrationInterface {
    name = 'SetDefaultValueForTitleValueInArticle1755611120299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`);
    }

}
