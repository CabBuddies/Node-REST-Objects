import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface IAccess {
    _id: string;
    author: IUser;
    queryId: string;
    userId: IUser;
    createdAt: any;
    lastModifiedAt: any;
    status: string;
    customAttributes: any;
}
declare class Access extends RESTObject<IAccess> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { IAccess, Access };
