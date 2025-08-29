"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddArticleEntity1755524456532 = void 0;
class AddArticleEntity1755524456532 {
    name = 'AddArticleEntity1755524456532';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, "body" character varying NOT NULL, "title" character varying NOT NULL, "taglist" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "favoritesCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "articles"`);
    }
}
exports.AddArticleEntity1755524456532 = AddArticleEntity1755524456532;
//# sourceMappingURL=1755524456532-AddArticleEntity.js.map