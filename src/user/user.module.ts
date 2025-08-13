import { UserControlller } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserControlller],
  providers: [UserService],
})
export class UserModule {}
