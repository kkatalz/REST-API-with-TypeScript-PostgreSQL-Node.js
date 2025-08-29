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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const article_entity_1 = require("../article/article.entity");
const comment_entity_1 = require("./comment.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CommentService = class CommentService {
    commentRepository;
    articleRepository;
    constructor(commentRepository, articleRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
    }
    async getAllComments(slug) {
        const article = await this.articleRepository.findOne({
            where: {
                slug,
            },
        });
        if (!article) {
            throw new common_1.HttpException('Article not found', common_1.HttpStatus.NOT_FOUND);
        }
        const comments = await this.commentRepository.find({
            where: {
                articleId: article.id,
            },
            order: { createdAt: 'DESC' },
        });
        return this.generateCommentsResponse(comments);
    }
    async addCommentToArticle(user, slug, addCommentDto) {
        const article = await this.articleRepository.findOne({
            where: {
                slug,
            },
        });
        if (!article) {
            throw new common_1.HttpException('Article not found', common_1.HttpStatus.NOT_FOUND);
        }
        const comment = new comment_entity_1.CommentEntity();
        Object.assign(comment, addCommentDto);
        comment.author = user;
        comment.article = article;
        const savedComment = await this.commentRepository.save(comment);
        return this.generateCommentResponse(savedComment);
    }
    generateCommentResponse(comment) {
        return {
            comment,
        };
    }
    generateCommentsResponse(comments) {
        return {
            comments,
        };
    }
    async deleteComment(currentUserId, slug, commentId) {
        const article = await this.articleRepository.findOne({
            where: { slug },
        });
        if (!article) {
            throw new common_1.HttpException('Article not found', common_1.HttpStatus.NOT_FOUND);
        }
        const comment = await this.commentRepository.findOne({
            where: {
                id: commentId,
                article: {
                    slug,
                },
            },
        });
        if (!comment) {
            throw new common_1.HttpException('Given comment is not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (comment?.authorId !== currentUserId) {
            throw new common_1.HttpException('You are not the author. Access denied.', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.commentRepository.delete({ id: commentId });
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(article_entity_1.ArticleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comment.service.js.map