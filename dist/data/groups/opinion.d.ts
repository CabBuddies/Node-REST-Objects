import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
interface IOpinion {
    _id: string;
    author: IUser;
    body: string;
    queryId: string;
    responseId: string;
    opinionType: string;
    createdAt: any;
    customAttributes: any;
    [prop: string]: any;
}
declare class Opinion extends RESTObject<IOpinion> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { IOpinion, Opinion };
