import { CreateUserDto } from '@/user/dto/createUser.dto';
import { LoginUserDto } from '@/user/dto/loginUserDto.dto';
import { UpdateUserDto } from '@/user/dto/updateUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserService } from '@/user/user.service';
export declare class UserControlller {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<IUserResponse>;
    loginUser(loginUserDto: LoginUserDto): Promise<IUserResponse>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<IUserResponse>;
    getCurrentUser(userId: number): Promise<IUserResponse>;
}
