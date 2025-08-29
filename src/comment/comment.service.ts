import { ArticleEntity } from '@/article/article.entity';
import { IArticleResponse } from '@/article/types/articleResponse.interface';
import { CommentEntity } from '@/comment/comment.entity';
import { AddCommentDto } from '@/comment/dto/addComment.dto';
import { ICommentResponse } from '@/comment/types/commentResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

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
}
