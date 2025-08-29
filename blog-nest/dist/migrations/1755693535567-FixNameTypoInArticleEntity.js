"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixNameTypoInArticleEntity1755693535567 = void 0;
class FixNameTypoInArticleEntity1755693535567 {
    name = 'FixNameTypoInArticleEntity1755693535567';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "taglist" TO "tagList"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "tagList" TO "taglist"`);
    }
}
exports.FixNameTypoInArticleEntity1755693535567 = FixNameTypoInArticleEntity1755693535567;
//# sourceMappingURL=1755693535567-FixNameTypoInArticleEntity.js.map