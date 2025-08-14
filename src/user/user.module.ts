import { UserControlller } from '@/user/user.controller';
import { UserEntity } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserControlller],
  providers: [UserService],
})
export class UserModule {}
