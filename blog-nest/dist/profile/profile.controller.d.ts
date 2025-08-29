import { IProfileResponse } from '@/profile/types/profileResponse.interface';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(currentUserId: number, profileUsername: string): Promise<IProfileResponse>;
    followProfile(currentUserId: number, followingUsername: string): Promise<IProfileResponse>;
    unfollowProfile(currentUserId: number, unfollowingUsername: string): Promise<IProfileResponse>;
}
