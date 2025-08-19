import { ArticleEntity } from '@/article/article.entity';
import { CreateArticleDto } from '@/article/dto/createArticle.dto';
import { IArticleResponse } from '@/article/types/articleResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    user: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();

    Object.assign(article, createArticleDto);

    if (!article.taglist) {
      article.taglist = [];
    }

    article.slug = this.generateSlug(article.title);
    article.author = user;

    return await this.articleRepository.save(article);
  }

  generateArticleResponse(article: ArticleEntity): IArticleResponse {
    return {
      article,
    };
  }

  generateSlug(title: string): string {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    return `${slugify(title, { lower: true })}-${id}`;
  }
}
