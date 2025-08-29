import { CreateUserDto } from '@/user/dto/createUser.dto';
import { LoginUserDto } from '@/user/dto/loginUserDto.dto';
import { UpdateUserDto } from '@/user/dto/updateUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(createUserDto: CreateUserDto): Promise<IUserResponse>;
    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    findUserById(id: number): Promise<UserEntity>;
    generateToken(user: UserEntity): string;
    generateUserResponse(user: UserEntity): IUserResponse;
}
