import { ArticleEntity } from '@/article/article.entity';
import { UserEntity } from '@/user/user.entity';
export declare class CommentEntity {
    id: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    articleId: number;
    author: UserEntity;
    article: ArticleEntity;
    updateTimestamp(): void;
}
