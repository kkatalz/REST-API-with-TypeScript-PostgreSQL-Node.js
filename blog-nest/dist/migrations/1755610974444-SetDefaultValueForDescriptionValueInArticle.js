"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetDefaultValueForDescriptionValueInArticle1755610974444 = void 0;
class SetDefaultValueForDescriptionValueInArticle1755610974444 {
    name = 'SetDefaultValueForDescriptionValueInArticle1755610974444';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" SET DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" DROP DEFAULT`);
    }
}
exports.SetDefaultValueForDescriptionValueInArticle1755610974444 = SetDefaultValueForDescriptionValueInArticle1755610974444;
//# sourceMappingURL=1755610974444-SetDefaultValueForDescriptionValueInArticle.js.map