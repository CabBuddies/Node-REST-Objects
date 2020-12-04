import { refreshAPI } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';

interface IReply{
    _id:string;
    author:IUser;
    body:string;
    postId:string;
    createdAt:any;
    lastModifiedAt:any;
    customAttributes:any;
    [prop:string]:any;
}

class Reply extends RESTObject<IReply>{

    constructor(){
        super(refreshAPI().GROUPS.REPLY);
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
                postId:'',
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new Reply();
        }

        this.overloadables.creationPacket = () => {
            return {
                body:this.data.body||'',
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
    IReply,
    Reply
}