"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentEntity = void 0;
const article_entity_1 = require("../article/article.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let CommentEntity = class CommentEntity {
    id;
    body;
    createdAt;
    updatedAt;
    authorId;
    articleId;
    author;
    article;
    updateTimestamp() {
        this.updatedAt = new Date();
    }
};
exports.CommentEntity = CommentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], CommentEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CommentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CommentEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "articleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CommentEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => article_entity_1.ArticleEntity, (article) => article.comments),
    (0, typeorm_1.JoinColumn)({ name: 'articleId' }),
    __metadata("design:type", article_entity_1.ArticleEntity)
], CommentEntity.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommentEntity.prototype, "updateTimestamp", null);
exports.CommentEntity = CommentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'comments' })
], CommentEntity);
//# sourceMappingURL=comment.entity.js.map