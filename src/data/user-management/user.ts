interface IUser{
    _id:string;
    userId:string;
    email:string;
    firstName:string;
    lastName:string;
    displayPicture:string;
    [props:string]:any;
}

class User{

}

export {
    IUser,
    User
}