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
exports.ArticleService = void 0;
const article_entity_1 = require("./article.entity");
const follow_entity_1 = require("../profile/follow.entity");
const user_entity_1 = require("../user/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const slugify_1 = require("slugify");
const typeorm_2 = require("typeorm");
let ArticleService = class ArticleService {
    articleRepository;
    userRepository;
    followRepository;
    constructor(articleRepository, userRepository, followRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.followRepository = followRepository;
    }
    async findAllArticles(currentUserId, query) {
        const queryBuilder = this.articleRepository
            .createQueryBuilder('articles')
            .leftJoinAndSelect('articles.author', 'author');
        if (query.tag) {
            queryBuilder.andWhere('articles.tagList ILIKE :tag', {
                tag: `%${query.tag}%`,
            });
        }
        if (query.author) {
            const author = await this.userRepository.findOne({
                where: {
                    username: query.author,
                },
            });
            if (author) {
                queryBuilder.andWhere('articles.authorId = :id ', {
                    id: author?.id,
                });
            }
            else {
                return { articles: [], articlesCount: 0 };
            }
        }
        queryBuilder.orderBy('articles.createdAt', 'DESC');
        const articlesCount = await queryBuilder.getCount();
        if (query.limit) {
            queryBuilder.limit(query.limit);
        }
        if (query.offset) {
            queryBuilder.offset(query.offset);
        }
        if (query.favorited) {
            const author = await this.userRepository.findOne({
                where: {
                    username: query.favorited,
                },
                relations: ['favorites'],
            });
            if (!author || author.favorites.length === 0) {
                return { articles: [], articlesCount: 0 };
            }
            const favoritesIds = author?.favorites.map((article) => article.id);
            queryBuilder.andWhere('articles.id IN (:...ids)', { ids: favoritesIds });
        }
        const articles = await queryBuilder.getMany();
        let userFavoritesIds = [];
        if (currentUserId) {
            const currentUser = await this.userRepository.findOne({
                where: {
                    id: currentUserId,
                },
                relations: ['favorites'],
            });
            userFavoritesIds = currentUser
                ? currentUser.favorites.map((article) => article.id)
                : [];
        }
        const articlesWithFavorited = articles.map((article) => {
            const favorited = userFavoritesIds.includes(article.id);
            return { ...article, favorited };
        });
        return { articles: articlesWithFavorited, articlesCount };
    }
    async getUserFeed(currentUserId, query) {
        const follows = await this.followRepository.find({
            where: {
                followerId: currentUserId,
            },
        });
        const followingIds = follows.map((user) => user.followingId);
        if (!follows.length) {
            return { articles: [], articlesCount: 0 };
        }
        const queryBuilder = this.articleRepository
            .createQueryBuilder('articles')
            .leftJoinAndSelect('articles.author', 'author');
        queryBuilder.andWhere('articles.authorId IN (:...followingIds)', {
            followingIds,
        });
        if (query.limit) {
            queryBuilder.limit(query.limit);
        }
        if (query.offset) {
            queryBuilder.offset(query.offset);
        }
        const articles = await queryBuilder.getMany();
        const articlesCount = await queryBuilder.getCount();
        return { articles, articlesCount };
    }
    async createArticle(user, createArticleDto) {
        const article = new article_entity_1.ArticleEntity();
        Object.assign(article, createArticleDto);
        if (!article.tagList) {
            article.tagList = [];
        }
        article.slug = this.generateSlug(article.title);
        article.author = user;
        return await this.articleRepository.save(article);
    }
    async getSingleArticle(slug) {
        const article = await this.findBySlug(slug);
        return article;
    }
    async deleteArticle(slug, currentUserId) {
        const article = await this.findBySlug(slug);
        if (article.author.id !== currentUserId) {
            throw new common_1.HttpException('You are not the author. Access denied.', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.articleRepository.delete({ slug });
    }
    async updateArticle(slug, currentUserId, updateArticleDto) {
        const article = await this.findBySlug(slug);
        if (article.author.id !== currentUserId) {
            throw new common_1.HttpException('You are not the author. Access denied.', common_1.HttpStatus.FORBIDDEN);
        }
        if (updateArticleDto.title) {
            article.slug = this.generateSlug(updateArticleDto.title);
        }
        Object.assign(article, updateArticleDto);
        return await this.articleRepository.save(article);
    }
    async findBySlug(slug) {
        const article = await this.articleRepository.findOne({
            where: {
                slug,
            },
        });
        if (!article) {
            throw new common_1.HttpException('Article not found', common_1.HttpStatus.NOT_FOUND);
        }
        return article;
    }
    async addFavoriteArticle(slug, currentUserId) {
        const user = await this.userRepository.findOne({
            where: {
                id: currentUserId,
            },
            relations: ['favorites'],
        });
        if (!user) {
            throw new common_1.HttpException(`User with ID ${currentUserId} was not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const currentArticle = await this.findBySlug(slug);
        const isNotFavorite = !user?.favorites.find((article) => article.slug == currentArticle.slug);
        if (isNotFavorite) {
            currentArticle.favoritesCount++;
            user?.favorites.push(currentArticle);
            await this.articleRepository.save(currentArticle);
            await this.userRepository.save(user);
        }
        return { ...currentArticle, favorited: true };
    }
    async removeArticleFromFavorites(slug, currentUserId) {
        const user = await this.userRepository.findOne({
            where: {
                id: currentUserId,
            },
            relations: ['favorites'],
        });
        if (!user) {
            throw new common_1.HttpException(`User with ID ${currentUserId} was not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const currentArticle = await this.findBySlug(slug);
        const articleIndex = user.favorites.findIndex((article) => article.slug === currentArticle.slug);
        if (articleIndex >= 0) {
            currentArticle.favoritesCount--;
            user.favorites.splice(articleIndex, 1);
            await this.articleRepository.save(currentArticle);
            await this.userRepository.save(user);
        }
        return { ...currentArticle, favorited: false };
    }
    generateArticleResponse(article) {
        return {
            article,
        };
    }
    generateSlug(title) {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
        return `${(0, slugify_1.default)(title, { lower: true })}-${id}`;
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.ArticleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(follow_entity_1.FollowEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleService);
//# sourceMappingURL=article.service.js.map