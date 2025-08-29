"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedCreatedAtForTags1755171508470 = void 0;
class AddedCreatedAtForTags1755171508470 {
    name = 'AddedCreatedAtForTags1755171508470';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
    }
}
exports.AddedCreatedAtForTags1755171508470 = AddedCreatedAtForTags1755171508470;
//# sourceMappingURL=1755171508470-AddedCreatedAtForTags.js.map