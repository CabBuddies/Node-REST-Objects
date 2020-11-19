import RESTObject from '../../rest/rest.object';
import { Content, Stats } from './schemas';
import { IUser } from '../user-management/user';
interface IResponse {
    _id: string;
    author: IUser;
    queryId: string;
    published: Content;
    draft: Content;
    createdAt: any;
    status: string;
    customAttributes: any;
    stats: Stats;
    [prop: string]: any;
}
declare class Response extends RESTObject<IResponse> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
    getQueryId(): string;
    setQueryId(queryId: any): void;
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
export { IResponse, Response };
