import { ArticleEntity } from '@/article/article.entity';
import { CreateArticleDto } from '@/article/dto/createArticle.dto';
import { UpdateArticleDto } from '@/article/dto/updateArticle.dto';
import { IArticleResponse } from '@/article/types/articleResponse.interface';
import { IArticlesResponse } from '@/article/types/articlesResponse.interface';
import { FollowEntity } from '@/profile/follow.entity';
import { UserEntity } from '@/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
export declare class ArticleService {
    private readonly articleRepository;
    private readonly userRepository;
    private readonly followRepository;
    constructor(articleRepository: Repository<ArticleEntity>, userRepository: Repository<UserEntity>, followRepository: Repository<FollowEntity>);
    findAllArticles(currentUserId: number, query: any): Promise<IArticlesResponse>;
    getUserFeed(currentUserId: number, query: any): Promise<IArticlesResponse>;
    createArticle(user: UserEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity>;
    getSingleArticle(slug: string): Promise<ArticleEntity>;
    deleteArticle(slug: string, currentUserId: number): Promise<DeleteResult>;
    updateArticle(slug: string, currentUserId: number, updateArticleDto: UpdateArticleDto): Promise<ArticleEntity>;
    findBySlug(slug: string): Promise<ArticleEntity>;
    addFavoriteArticle(slug: string, currentUserId: number): Promise<ArticleEntity>;
    removeArticleFromFavorites(slug: string, currentUserId: number): Promise<ArticleEntity>;
    generateArticleResponse(article: ArticleEntity): IArticleResponse;
    generateSlug(title: string): string;
}
