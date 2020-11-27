import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface ITQAccess {
    _id: string;
    author: IUser;
    queryId: string;
    userId: IUser;
    createdAt: any;
    lastModifiedAt: any;
    status: string;
    customAttributes: any;
}
declare class TQAccess extends RESTObject<ITQAccess> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { ITQAccess, TQAccess };
