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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const follow_entity_1 = require("./follow.entity");
const user_entity_1 = require("../user/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProfileService = class ProfileService {
    userRepository;
    followRepository;
    constructor(userRepository, followRepository) {
        this.userRepository = userRepository;
        this.followRepository = followRepository;
    }
    async getProfile(currentUserId, profileUsername) {
        const profile = await this.userRepository.findOne({
            where: {
                username: profileUsername,
            },
        });
        if (!profile) {
            throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
        }
        let isFollowed = false;
        if (currentUserId) {
            const follow = await this.followRepository.findOne({
                where: {
                    followerId: currentUserId,
                    followingId: profile.id,
                },
            });
            isFollowed = Boolean(follow);
        }
        return { ...profile, following: isFollowed };
    }
    async followProfile(currentUserId, followingUsername) {
        const followingProfile = await this.userRepository.findOne({
            where: {
                username: followingUsername,
            },
        });
        if (!followingProfile) {
            throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (currentUserId === followingProfile.id) {
            throw new common_1.HttpException('You can not follow yourself', common_1.HttpStatus.BAD_REQUEST);
        }
        const follow = await this.followRepository.findOne({
            where: {
                followerId: currentUserId,
                followingId: followingProfile.id,
            },
        });
        if (!follow) {
            const newFollow = new follow_entity_1.FollowEntity();
            newFollow.followerId = currentUserId;
            newFollow.followingId = followingProfile.id;
            await this.followRepository.save(newFollow);
        }
        return { ...followingProfile, following: true };
    }
    async unfollowProfile(currentUserId, unfollowingUsername) {
        const unfollowingProfile = await this.userRepository.findOne({
            where: {
                username: unfollowingUsername,
            },
        });
        if (!unfollowingProfile) {
            throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.followRepository.delete({
            followerId: currentUserId,
            followingId: unfollowingProfile.id,
        });
        return { ...unfollowingProfile, following: false };
    }
    generateProfileResponse(profile) {
        delete profile?.password;
        delete profile?.email;
        return { profile };
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(follow_entity_1.FollowEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map