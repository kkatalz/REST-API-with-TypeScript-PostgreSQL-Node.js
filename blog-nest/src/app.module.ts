import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ArticleModule } from '@/article/article.module';
import ormconfig from '@/ormconfig';
import { ProfileModule } from '@/profile/profile.module';
import { TagModule } from '@/tag/tag.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    UserModule,
    ArticleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
