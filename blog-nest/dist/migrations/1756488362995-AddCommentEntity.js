"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommentEntity1756488362995 = void 0;
class AddCommentEntity1756488362995 {
    name = 'AddCommentEntity1756488362995';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4548cc4a409b8651ec75f70e280" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4548cc4a409b8651ec75f70e280"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }
}
exports.AddCommentEntity1756488362995 = AddCommentEntity1756488362995;
//# sourceMappingURL=1756488362995-AddCommentEntity.js.map