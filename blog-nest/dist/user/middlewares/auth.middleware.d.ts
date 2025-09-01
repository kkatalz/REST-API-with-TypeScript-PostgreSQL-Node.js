import { AuthRequest } from '@/types/expressRequest.interface';
import { UserService } from '@/user/user.service';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
