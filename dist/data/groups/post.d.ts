import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
import { Stats } from './schemas';
interface IPost {
    _id: string;
    author: IUser;
    title: string;
    body: string;
    groupId: string;
    active: boolean;
    topics: string[];
    stats: Stats;
    createdAt: any;
    lastModifiedAt: any;
    customAttributes: any;
    [prop: string]: any;
}
declare class Post extends RESTObject<IPost> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { IPost, Post };
