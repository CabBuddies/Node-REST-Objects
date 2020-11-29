import { refreshAPI } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';

interface ITGAccess{
    _id:string;
    author:IUser;
    groupId:string;
    userId:IUser;
    createdAt:any;
    lastModifiedAt:any;
    role:string;
    status:string;
    customAttributes:any;
    //[prop:string]:any;
}

class TGAccess extends RESTObject<ITGAccess>{

    constructor(){
        super(refreshAPI().GROUPS.ACCESS);
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
                groupId:'',
                userId:{
                    _id:'',
                    userId:'',
                    email:'',
                    firstName:'',
                    lastName:'',
                    displayPicture:''
                },
                role:'member',
                status:'requested',
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new TGAccess();
        }

        this.overloadables.creationPacket = () => {
            return {
                userId:this.data.userId||'',
                status:this.data.status||'requested',
                role:this.data.role||'member'
            }
        }
    
        this.overloadables.updationPacket = () => {
            return {
                userId:this.data.userId||'',
                status:this.data.status||'requested'
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
    ITGAccess,
    TGAccess
}