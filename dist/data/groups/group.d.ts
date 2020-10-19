import RESTObject from '../../rest/rest.object';
import { Stats } from './schemas';
import { IUser } from '../user-management/user';
interface IGroup {
    _id: string;
    author: IUser;
    title: string;
    description: string;
    displayPicture: string;
    active: boolean;
    topics: any;
    stats: Stats;
    createdAt: any;
    lastModifiedAt: any;
    customAttributes: any;
    [prop: string]: any;
}
declare class Group extends RESTObject<IGroup> {
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
    getPublished(): any;
}
export { IGroup, Group };
