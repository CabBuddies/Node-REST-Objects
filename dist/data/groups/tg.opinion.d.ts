import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface ITGOpinion {
    _id: string;
    author: IUser;
    body: string;
    groupId: string;
    postId: string;
    opinionType: string;
    createdAt: any;
    customAttributes: any;
    [prop: string]: any;
}
declare class TGOpinion extends RESTObject<ITGOpinion> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { ITGOpinion, TGOpinion };
