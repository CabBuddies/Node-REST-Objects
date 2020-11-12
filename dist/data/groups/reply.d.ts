import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface IReply {
    _id: string;
    author: IUser;
    body: string;
    postId: string;
    createdAt: any;
    lastModifiedAt: any;
    customAttributes: any;
    [prop: string]: any;
}
declare class Reply extends RESTObject<IReply> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { IReply, Reply };
