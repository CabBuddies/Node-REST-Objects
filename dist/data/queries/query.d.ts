import RESTObject from '../../rest/rest.object';
import { Content, Stats } from './schemas';
import { IUser } from '../user-management/user';
interface IQuery {
    _id: string;
    author: IUser;
    published: Content;
    draft: Content;
    createdAt: any;
    status: string;
    customAttributes: any;
    stats: Stats;
    access: {
        type: string;
        users: string[];
    };
    [prop: string]: any;
}
declare class Query extends RESTObject<IQuery> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
    setDraft(data: {
        title: string;
        body: string;
        tags: string[];
    }): void;
    setPublished(data: {
        title: string;
        body: string;
        tags: string[];
    }): void;
    setStatus(status: string): void;
    getPublished(): {
        _id: string;
        title: string;
        body: string;
        tags: String[];
        lastModifiedAt: any;
    };
}
export { IQuery, Query };
