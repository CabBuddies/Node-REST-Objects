import RESTObject from '../../rest/rest.object';
import { Stats } from './schemas';
import { IUser } from '../user-management/user';
interface IGeo {
    lat: number;
    lng: number;
}
interface ITime {
    _id: string;
    timestamp: any;
    isFlexible: boolean;
    flexibility: {
        early: any;
        late: any;
    };
}
interface IPlace {
    _id: string;
    gps: IGeo;
    address: {
        raw: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
    isFlexible: boolean;
    flexibility: {
        bounds: IGeo[];
    };
}
interface IGroup {
    _id: string;
    author: IUser;
    title: string;
    description: string;
    displayPicture: string;
    active: boolean;
    topics: any;
    plan: {
        origin: {
            time: ITime;
            place: IPlace;
        };
        destination: {
            time: ITime;
            place: IPlace;
        };
    };
    stats: Stats;
    createdAt: any;
    lastModifiedAt: any;
    customAttributes: any;
    access: {
        view: string;
        post: string;
    };
    preferences: {
        automaticMembership: boolean;
    };
    [prop: string]: any;
}
declare class Group extends RESTObject<IGroup> {
    constructor();
    get_id(): string;
    set_id(_id: any): void;
}
export { IGroup, Group };
