import RESTObject from '../../rest/rest.object';
interface IUser {
    _id: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    displayPicture: string;
    [props: string]: any;
}
declare class User extends RESTObject<IUser> {
    constructor();
    getMe(): Promise<void>;
}
export { IUser, User };
