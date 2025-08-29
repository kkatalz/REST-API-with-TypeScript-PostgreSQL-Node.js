import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultValueForDescriptionValueInArticle1755610974444
  implements MigrationInterface
{
  name = 'SetDefaultValueForDescriptionValueInArticle1755610974444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "description" SET DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "description" DROP DEFAULT`,
    );
  }
}
