import { ArticleEntity } from '@/article/article.entity';
import { IArticleResponse } from '@/article/types/articleResponse.interface';
import { CommentEntity } from '@/comment/comment.entity';
import { AddCommentDto } from '@/comment/dto/addComment.dto';
import { ICommentResponse } from '@/comment/types/commentResponse.interface';
import { ICommentsResponse } from '@/comment/types/commentsResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async getAllComments(slug: string): Promise<ICommentsResponse> {
    const article = await this.articleRepository.findOne({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const comments = await this.commentRepository.find({
      where: {
        articleId: article.id,
      },
      order: { createdAt: 'DESC' },
    });

    return this.generateCommentsResponse(comments);
  }

  async addCommentToArticle(
    user: UserEntity,
    slug: string,
    addCommentDto: AddCommentDto,
  ): Promise<ICommentResponse> {
    const article = await this.articleRepository.findOne({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const comment = new CommentEntity();
    Object.assign(comment, addCommentDto);
    comment.author = user;
    comment.article = article;

    const savedComment = await this.commentRepository.save(comment);

    return this.generateCommentResponse(savedComment);
  }

  generateCommentResponse(comment: CommentEntity): ICommentResponse {
    return {
      comment,
    };
  }
  generateCommentsResponse(comments: CommentEntity[]): ICommentsResponse {
    return {
      comments,
    };
  }

  async deleteComment(
    currentUserId: number,
    slug: string,
    commentId: number,
  ): Promise<DeleteResult> {
    const article = await this.articleRepository.findOne({
      where: { slug },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
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
      throw new HttpException(
        'Given comment is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (comment?.authorId !== currentUserId) {
      throw new HttpException(
        'You are not the author. Access denied.',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.commentRepository.delete({ id: commentId });
  }
}
