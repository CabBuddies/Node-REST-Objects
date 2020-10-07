import { API } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
import {Content,Stats} from './schemas';

interface IComment{
    _id:string;
    author:IUser;
    body:string;
    queryId:string;
    responseId:string;
    createdAt:any;
    lastModifiedAt:any;
    customAttributes:any;
    //[prop:string]:any;
}

class Comment extends RESTObject<IComment>{

    constructor(){
        super(API.QUERIES.COMMENT);
        this.overloadables.init = () => {
            this.setData({
                _id:'',
                author:{
                    _id:'',
                    userId:'',
                    email:'',
                    firstName:'',
                    lastName:'',
                    displayPicture:''
                },
                body:'',
                queryId:'',
                responseId:'',
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new Comment();
        }

        this.overloadables.creationPacket = () => {
            return {
                body:this.data.body||'',
                queryId:this.data.queryId||'',
                responseId:this.data.responseId||'',
                customAttributes:this.data.customAttributes||{}
            }
        }
    
        this.overloadables.updationPacket = () => {
            return {
                body:this.data.body||'',
                customAttributes:this.data.customAttributes||{}
            }
        }

        this.overloadables.init();
    }

    get_id(){
        return this.data._id;
    }

    set_id(_id){
        this.data._id = _id;
    }

}

export {
    IComment,
    Comment
}