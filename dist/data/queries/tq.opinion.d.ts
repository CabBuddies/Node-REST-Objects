import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface ITQOpinion {
    _id: string;
    author: IUser;
    body: string;
    queryId: string;
    responseId: string;
    opinionType: string;
    createdAt: any;
    customAttributes: any;
}
declare class TQOpinion extends RESTObject<ITQOpinion> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { ITQOpinion, TQOpinion };
