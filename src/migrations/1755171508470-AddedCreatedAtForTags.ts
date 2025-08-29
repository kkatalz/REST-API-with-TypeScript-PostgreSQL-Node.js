import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCreatedAtForTags1755171508470 implements MigrationInterface {
  name = 'AddedCreatedAtForTags1755171508470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
  }
}
