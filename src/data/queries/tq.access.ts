import { refreshAPI } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';

interface ITQAccess{
    _id:string;
    author:IUser;
    queryId:string;
    userId:IUser;
    createdAt:any;
    lastModifiedAt:any;
    status:string;
    customAttributes:any;
    //[prop:string]:any;
}

class TQAccess extends RESTObject<ITQAccess>{

    constructor(){
        super(refreshAPI().QUERIES.ACCESS);
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
                queryId:'',
                userId:{
                    _id:'',
                    userId:'',
                    email:'',
                    firstName:'',
                    lastName:'',
                    displayPicture:''
                },
                status:'requested',
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new TQAccess();
        }

        this.overloadables.creationPacket = () => {
            return {
                userId:this.data.userId||'',
                status:this.data.status||'requested'
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
    ITQAccess,
    TQAccess
}