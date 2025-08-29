import { FollowEntity } from '@/profile/follow.entity';
import { ProfileType } from '@/profile/types/profile.type';
import { IProfileResponse } from '@/profile/types/profileResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { Repository } from 'typeorm';
export declare class ProfileService {
    private readonly userRepository;
    private readonly followRepository;
    constructor(userRepository: Repository<UserEntity>, followRepository: Repository<FollowEntity>);
    getProfile(currentUserId: number, profileUsername: string): Promise<ProfileType>;
    followProfile(currentUserId: number, followingUsername: string): Promise<ProfileType>;
    unfollowProfile(currentUserId: number, unfollowingUsername: string): Promise<ProfileType>;
    generateProfileResponse(profile: ProfileType): IProfileResponse;
}
