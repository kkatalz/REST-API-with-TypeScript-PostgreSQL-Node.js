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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const article_service_1 = require("./article.service");
const createArticle_dto_1 = require("./dto/createArticle.dto");
const updateArticle_dto_1 = require("./dto/updateArticle.dto");
const user_decorator_1 = require("../user/decorators/user.decorator");
const auth_guard_1 = require("../user/guards/auth.guard");
const user_entity_1 = require("../user/user.entity");
const common_1 = require("@nestjs/common");
let ArticleController = class ArticleController {
    articleService;
    constructor(articleService) {
        this.articleService = articleService;
    }
    async findAllArticles(currentUserId, query) {
        return await this.articleService.findAllArticles(currentUserId, query);
    }
    async getUserFeed(currentUserId, query) {
        return await this.articleService.getUserFeed(currentUserId, query);
    }
    async getArticle(slug) {
        const article = await this.articleService.getSingleArticle(slug);
        return this.articleService.generateArticleResponse(article);
    }
    async createArticle(user, createArticleDto) {
        const newArticle = await this.articleService.createArticle(user, createArticleDto);
        return this.articleService.generateArticleResponse(newArticle);
    }
    async deleteArticle(slug, currentUserId) {
        return await this.articleService.deleteArticle(slug, currentUserId);
    }
    async updateArticle(slug, currentUserId, updateArticleDto) {
        const updatedArticle = await this.articleService.updateArticle(slug, currentUserId, updateArticleDto);
        return this.articleService.generateArticleResponse(updatedArticle);
    }
    async addFavoriteArticle(slug, currentUserId) {
        const favoriteArticlle = await this.articleService.addFavoriteArticle(slug, currentUserId);
        return this.articleService.generateArticleResponse(favoriteArticlle);
    }
    async removeArticleFromFavorite(slug, currentUserId) {
        const removedArticle = await this.articleService.removeArticleFromFavorites(slug, currentUserId);
        return this.articleService.generateArticleResponse(removedArticle);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ArticleController.prototype, "findAllArticles", null);
__decorate([
    (0, common_1.Get)('feed'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ArticleController.prototype, "getUserFeed", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ArticleController.prototype, "getArticle", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('article')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        createArticle_dto_1.CreateArticleDto]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ArticleController.prototype, "createArticle", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ArticleController.prototype, "deleteArticle", null);
__decorate([
    (0, common_1.Put)(':slug'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, user_decorator_1.User)('id')),
    __param(2, (0, common_1.Body)('article')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, updateArticle_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ArticleController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Post)(':slug/favorite'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ArticleController.prototype, "addFavoriteArticle", null);
__decorate([
    (0, common_1.Delete)(':slug/favorite'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ArticleController.prototype, "removeArticleFromFavorite", null);
exports.ArticleController = ArticleController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map