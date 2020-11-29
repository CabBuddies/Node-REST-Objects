import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface IUserRelation {
    _id: string;
    author: IUser;
    createdAt: any;
    lastModifiedAt: any;
    status: "requested" | "blocked" | "accepted" | "rejected";
    followeeId: IUser;
    followerId: IUser;
    [prop: string]: any;
}
declare class UserRelation extends RESTObject<IUserRelation> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
    setFolloweeId(userId: any): void;
    setFollowerId(userId: any): void;
}
export { IUserRelation, UserRelation };
