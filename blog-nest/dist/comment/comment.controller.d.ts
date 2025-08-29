import { CommentService } from './comment.service';
import { UserEntity } from '@/user/user.entity';
import { AddCommentDto } from '@/comment/dto/addComment.dto';
import { ICommentResponse } from '@/comment/types/commentResponse.interface';
import { ICommentsResponse } from '@/comment/types/commentsResponse.interface';
import { DeleteResult } from 'typeorm';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getAllComments(slug: string): Promise<ICommentsResponse>;
    addCommentToArticle(user: UserEntity, slug: string, addCommentDto: AddCommentDto): Promise<ICommentResponse>;
    deleteComment(currentUserId: number, slug: string, id: number): Promise<DeleteResult>;
}
