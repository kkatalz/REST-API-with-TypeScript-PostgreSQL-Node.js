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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const user_decorator_1 = require("../user/decorators/user.decorator");
const auth_guard_1 = require("../user/guards/auth.guard");
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(currentUserId, profileUsername) {
        const profile = await this.profileService.getProfile(currentUserId, profileUsername);
        return this.profileService.generateProfileResponse(profile);
    }
    async followProfile(currentUserId, followingUsername) {
        const followedUser = await this.profileService.followProfile(currentUserId, followingUsername);
        return this.profileService.generateProfileResponse(followedUser);
    }
    async unfollowProfile(currentUserId, unfollowingUsername) {
        const unfollowedUser = await this.profileService.unfollowProfile(currentUserId, unfollowingUsername);
        return this.profileService.generateProfileResponse(unfollowedUser);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)(':username/follow'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProfileController.prototype, "followProfile", null);
__decorate([
    (0, common_1.Delete)(':username/follow'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProfileController.prototype, "unfollowProfile", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profiles'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map