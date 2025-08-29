import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNameTypoInArticleEntity1755693535567 implements MigrationInterface {
    name = 'FixNameTypoInArticleEntity1755693535567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "taglist" TO "tagList"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "tagList" TO "taglist"`);
    }

}
