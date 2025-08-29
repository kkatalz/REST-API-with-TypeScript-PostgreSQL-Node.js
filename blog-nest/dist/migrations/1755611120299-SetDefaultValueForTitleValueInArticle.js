"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetDefaultValueForTitleValueInArticle1755611120299 = void 0;
class SetDefaultValueForTitleValueInArticle1755611120299 {
    name = 'SetDefaultValueForTitleValueInArticle1755611120299';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" SET DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`);
    }
}
exports.SetDefaultValueForTitleValueInArticle1755611120299 = SetDefaultValueForTitleValueInArticle1755611120299;
//# sourceMappingURL=1755611120299-SetDefaultValueForTitleValueInArticle.js.map