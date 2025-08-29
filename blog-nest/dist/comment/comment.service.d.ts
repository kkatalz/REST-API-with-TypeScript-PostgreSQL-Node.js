import { ArticleEntity } from '@/article/article.entity';
import { CommentEntity } from '@/comment/comment.entity';
import { AddCommentDto } from '@/comment/dto/addComment.dto';
import { ICommentResponse } from '@/comment/types/commentResponse.interface';
import { ICommentsResponse } from '@/comment/types/commentsResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
export declare class CommentService {
    private readonly commentRepository;
    private readonly articleRepository;
    constructor(commentRepository: Repository<CommentEntity>, articleRepository: Repository<ArticleEntity>);
    getAllComments(slug: string): Promise<ICommentsResponse>;
    addCommentToArticle(user: UserEntity, slug: string, addCommentDto: AddCommentDto): Promise<ICommentResponse>;
    generateCommentResponse(comment: CommentEntity): ICommentResponse;
    generateCommentsResponse(comments: CommentEntity[]): ICommentsResponse;
    deleteComment(currentUserId: number, slug: string, commentId: number): Promise<DeleteResult>;
}
