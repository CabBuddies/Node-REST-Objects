import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface IComment {
    _id: string;
    author: IUser;
    body: string;
    queryId: string;
    responseId: string;
    createdAt: any;
    lastModifiedAt: any;
    customAttributes: any;
}
declare class Comment extends RESTObject<IComment> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { IComment, Comment };
