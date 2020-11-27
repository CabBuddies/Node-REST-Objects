import { API } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';

interface ITGOpinion{
    _id:string;
    author:IUser;
    body:string;
    groupId:string;
    postId:string;
    opinionType:string;
    createdAt:any;
    customAttributes:any;
    [prop:string]:any;
}

class TGOpinion extends RESTObject<ITGOpinion>{

    constructor(){
        super(API.GROUPS.OPINION);
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
                groupId:'',
                postId:'',
                opinionType:'',
                createdAt:0,
                customAttributes:{}
            });
        };

        this.overloadables.newInstance = () => {
            return new TGOpinion();
        }

        this.overloadables.creationPacket = () => {
            if(this.data.opinionType){
                if(['follow','upvote','downvote','spamreport'].indexOf(this.data.opinionType) === -1)
                    this.data.opinionType = 'upvote';
            }
            return {
                body:this.data.body||'',
                opinionType:this.data.opinionType||'upvote',
                customAttributes:this.data.customAttributes||{}
            }
        }
    
        this.overloadables.updationPacket = () => {
            const error = new Error();
            error.message = 'Option is not updatable.';
            throw error;
            return {}
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
    ITGOpinion,
    TGOpinion
}