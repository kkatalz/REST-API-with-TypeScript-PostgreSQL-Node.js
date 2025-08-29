import { ArticleService } from '@/article/article.service';
import { CreateArticleDto } from '@/article/dto/createArticle.dto';
import { UpdateArticleDto } from '@/article/dto/updateArticle.dto';
import { IArticleResponse } from '@/article/types/articleResponse.interface';
import { IArticlesResponse } from '@/article/types/articlesResponse.interface';
import { User } from '@/user/decorators/user.decorator';
import { AuthGuard } from '@/user/guards/auth.guard';
import { UserEntity } from '@/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAllArticles(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<IArticlesResponse> {
    return await this.articleService.findAllArticles(currentUserId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  async getUserFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<IArticlesResponse> {
    return await this.articleService.getUserFeed(currentUserId, query);
  }

  @Get(':slug')
  async getArticle(@Param('slug') slug: string): Promise<IArticleResponse> {
    const article = await this.articleService.getSingleArticle(slug);

    return this.articleService.generateArticleResponse(article);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createArticle(
    @User() user: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<IArticleResponse> {
    const newArticle = await this.articleService.createArticle(
      user,
      createArticleDto,
    );
    return this.articleService.generateArticleResponse(newArticle);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<DeleteResult> {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async updateArticle(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
    @Body('article') updateArticleDto: UpdateArticleDto,
  ): Promise<IArticleResponse> {
    const updatedArticle = await this.articleService.updateArticle(
      slug,
      currentUserId,
      updateArticleDto,
    );

    return this.articleService.generateArticleResponse(updatedArticle);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addFavoriteArticle(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IArticleResponse> {
    const favoriteArticlle = await this.articleService.addFavoriteArticle(
      slug,
      currentUserId,
    );
    return this.articleService.generateArticleResponse(favoriteArticlle);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async removeArticleFromFavorite(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IArticleResponse> {
    const removedArticle = await this.articleService.removeArticleFromFavorites(
      slug,
      currentUserId,
    );

    return this.articleService.generateArticleResponse(removedArticle);
  }
}
