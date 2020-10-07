class UserProfile{
    linkedInUrl:string;
}
class UserSetting{
    isPrivate:boolean;
}
class User{
    username:string;
    password:string;
    userProfile:UserProfile;
    userSetting:UserSetting;
}

