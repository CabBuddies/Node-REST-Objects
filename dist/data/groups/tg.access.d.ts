import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface ITGAccess {
    _id: string;
    author: IUser;
    groupId: string;
    userId: IUser;
    createdAt: any;
    lastModifiedAt: any;
    role: string;
    status: string;
    customAttributes: any;
}
declare class TGAccess extends RESTObject<ITGAccess> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { ITGAccess, TGAccess };
