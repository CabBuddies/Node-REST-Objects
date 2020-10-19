import { API } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
import {Stats} from './schemas';

interface IPost{
    _id:string;
    author:IUser;
    title:string;
    body:string;
    groupId:string;
    active:boolean;
    topics:string[];
    stats:Stats;
    createdAt:any;
    lastModifiedAt:any;
    customAttributes:any;
    [prop:string]:any;
}

class Post extends RESTObject<IPost>{

    constructor(){
        super(API.GROUPS.POST);
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
                title:'',
                body:'',
                groupId:'',
                active:true,
                stats:{
                    _id:'',
                    viewCount:0,
                    postCount:0,
                    replyCount:0,
                    followCount:0,
                    upVoteCount:0,
                    downVoteCount:0,
                    spamReportCount:0,
                    score:0
                },
                topics:[],
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new Post();
        }

        this.overloadables.creationPacket = () => {
            return {
                title:this.data.title||'',
                body:this.data.body||'',
                groupId:this.data.groupId||'',
                topics:this.data.topics||[],
                customAttributes:this.data.customAttributes||{}
            }
        }
    
        this.overloadables.updationPacket = () => {
            return {
                title:this.data.title||'',
                body:this.data.body||'',
                topics:this.data.topics||[],
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
    IPost,
    Post
}