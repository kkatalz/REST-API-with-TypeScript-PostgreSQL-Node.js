"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetDefaultValueForBodyValueInArticle1755611106159 = void 0;
class SetDefaultValueForBodyValueInArticle1755611106159 {
    name = 'SetDefaultValueForBodyValueInArticle1755611106159';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`);
    }
}
exports.SetDefaultValueForBodyValueInArticle1755611106159 = SetDefaultValueForBodyValueInArticle1755611106159;
//# sourceMappingURL=1755611106159-SetDefaultValueForBodyValueInArticle.js.map