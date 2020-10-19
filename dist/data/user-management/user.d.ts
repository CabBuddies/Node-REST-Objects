interface IUser {
    _id: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    displayPicture: string;
    [props: string]: any;
}
declare class User {
}
export { IUser, User };
