import { CreateUserDto } from '@/user/dto/createUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { LoginUserDto } from '@/user/dto/loginUserDto.dto';
import { compare } from 'bcrypt';

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

    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    const userByUsername = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const savedUser = await this.userRepository.save(newUser);
    return this.generateUserResponse(savedUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const matchPassword = await compare(loginUserDto.password, user.password);

    if (!matchPassword)
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );

    delete user.password;
    return user;
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user)
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);

    return user;
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
