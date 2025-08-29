import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentEntity } from '@/comment/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@/article/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ArticleEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
