"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFollowsTable1756200788202 = void 0;
class CreateFollowsTable1756200788202 {
    name = 'CreateFollowsTable1756200788202';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "follows"`);
    }
}
exports.CreateFollowsTable1756200788202 = CreateFollowsTable1756200788202;
//# sourceMappingURL=1756200788202-createFollowsTable.js.map