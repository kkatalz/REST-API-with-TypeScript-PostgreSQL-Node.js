import { CreateUserDto } from '@/user/dto/createUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    const savedUser = await this.userRepository.save(newUser);
    return this.generateUserResponse(savedUser);
  }

  generateToken(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    // const decode = verify(generatedToken, 'SECRET9090');
    // console.log(decode);
  }

  generateUserResponse(user: UserEntity): IUserResponse {
    return {
      user: { ...user, token: this.generateToken(user) },
    };
  }
}
