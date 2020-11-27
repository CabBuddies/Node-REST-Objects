import { API } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
import {Content,Stats} from './schemas';

interface ITQOpinion{
    _id:string;
    author:IUser;
    body:string;
    queryId:string;
    responseId:string;
    opinionType:string;
    createdAt:any;
    customAttributes:any;
    //[prop:string]:any;
}

class TQOpinion extends RESTObject<ITQOpinion>{

    constructor(){
        super(API.QUERIES.OPINION);
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
                opinionType:'',
                createdAt:0,
                customAttributes:{}
            });
        };

        this.overloadables.newInstance = () => {
            return new TQOpinion();
        }

        this.overloadables.creationPacket = () => {
            if(this.data.opinionType){
                if(['follow','upvote','downvote','spamreport'].indexOf(this.data.opinionType) === -1)
                    this.data.opinionType = 'upvote';
            }
            return {
                body:this.data.body||'',
                queryId:this.data.queryId||'',
                responseId:this.data.responseId||'',
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
    ITQOpinion,
    TQOpinion
}