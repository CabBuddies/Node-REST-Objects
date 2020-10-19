declare class UserProfile {
    linkedInUrl: string;
}
declare class UserSetting {
    isPrivate: boolean;
}
declare class User {
    username: string;
    password: string;
    userProfile: UserProfile;
    userSetting: UserSetting;
}
