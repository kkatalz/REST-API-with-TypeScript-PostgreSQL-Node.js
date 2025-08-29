import { ArticleService } from '@/article/article.service';
import { CreateArticleDto } from '@/article/dto/createArticle.dto';
import { UpdateArticleDto } from '@/article/dto/updateArticle.dto';
import { IArticleResponse } from '@/article/types/articleResponse.interface';
import { IArticlesResponse } from '@/article/types/articlesResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { DeleteResult } from 'typeorm';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAllArticles(currentUserId: number, query: any): Promise<IArticlesResponse>;
    getUserFeed(currentUserId: number, query: any): Promise<IArticlesResponse>;
    getArticle(slug: string): Promise<IArticleResponse>;
    createArticle(user: UserEntity, createArticleDto: CreateArticleDto): Promise<IArticleResponse>;
    deleteArticle(slug: string, currentUserId: number): Promise<DeleteResult>;
    updateArticle(slug: string, currentUserId: number, updateArticleDto: UpdateArticleDto): Promise<IArticleResponse>;
    addFavoriteArticle(slug: string, currentUserId: number): Promise<IArticleResponse>;
    removeArticleFromFavorite(slug: string, currentUserId: number): Promise<IArticleResponse>;
}
