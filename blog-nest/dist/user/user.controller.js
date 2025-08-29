"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControlller = void 0;
const user_decorator_1 = require("./decorators/user.decorator");
const createUser_dto_1 = require("./dto/createUser.dto");
const loginUserDto_dto_1 = require("./dto/loginUserDto.dto");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const auth_guard_1 = require("./guards/auth.guard");
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
let UserControlller = class UserControlller {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserDto) {
        return await this.userService.createUser(createUserDto);
    }
    async loginUser(loginUserDto) {
        const user = await this.userService.loginUser(loginUserDto);
        return this.userService.generateUserResponse(user);
    }
    async updateUser(userId, updateUserDto) {
        const updatedUser = await this.userService.updateUser(userId, updateUserDto);
        return this.userService.generateUserResponse(updatedUser);
    }
    async getCurrentUser(userId) {
        const currentUser = await this.userService.findUserById(userId);
        return this.userService.generateUserResponse(currentUser);
    }
};
exports.UserControlller = UserControlller;
__decorate([
    (0, common_1.Post)('users'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UserControlller.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('users/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUserDto_dto_1.LoginUserDto]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserControlller.prototype, "loginUser", null);
__decorate([
    (0, common_1.Put)('user'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserControlller.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserControlller.prototype, "getCurrentUser", null);
exports.UserControlller = UserControlller = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserControlller);
//# sourceMappingURL=user.controller.js.map