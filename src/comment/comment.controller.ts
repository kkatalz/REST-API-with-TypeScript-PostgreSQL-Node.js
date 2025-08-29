import {
  Body,
  Controller,
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
}
