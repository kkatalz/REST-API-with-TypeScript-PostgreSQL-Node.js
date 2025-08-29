import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@/user/guards/auth.guard';
import { UserEntity } from '@/user/user.entity';
import { User } from '@/user/decorators/user.decorator';
import { AddCommentDto } from '@/comment/dto/addComment.dto';
import { ICommentResponse } from '@/comment/types/commentResponse.interface';
import { ICommentsResponse } from '@/comment/types/commentsResponse.interface';
import { DeleteResult } from 'typeorm';

@Controller('articles')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':slug/comments')
  async getAllComments(
    @Param('slug') slug: string,
  ): Promise<ICommentsResponse> {
    const comments = await this.commentService.getAllComments(slug);
    return comments;
  }

  @Post(':slug/comments')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async addCommentToArticle(
    @User() user: UserEntity,
    @Param('slug') slug: string,
    @Body('comment') addCommentDto: AddCommentDto,
  ): Promise<ICommentResponse> {
    const comment = await this.commentService.addCommentToArticle(
      user,
      slug,
      addCommentDto,
    );
    return comment;
  }

  @Delete(':slug/comments/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async deleteComment(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Param('id') id: number,
  ): Promise<DeleteResult> {
    const comment = await this.commentService.deleteComment(
      currentUserId,
      slug,
      id,
    );
    return comment;
  }
}
