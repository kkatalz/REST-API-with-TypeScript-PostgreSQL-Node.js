import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';
export declare class ArticleEntity {
    id: number;
    slug: string;
    description: string;
    body: string;
    title: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favoritesCount: number;
    author: UserEntity;
    comments: CommentEntity[];
    updateTimestamp(): void;
}
