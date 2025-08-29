"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAuthorArticleRelation1755525493641 = void 0;
class AddAuthorArticleRelation1755525493641 {
    name = 'AddAuthorArticleRelation1755525493641';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "authorId"`);
    }
}
exports.AddAuthorArticleRelation1755525493641 = AddAuthorArticleRelation1755525493641;
//# sourceMappingURL=1755525493641-AddAuthorArticleRelation.js.map