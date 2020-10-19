import RESTObject from '../../rest/rest.object';
import {Content,Stats} from './schemas';
import {IUser} from '../user-management/user';
import { API } from '../../rest/api';

interface IGroup{
    _id:string;
    author:IUser;
    title:string;
    description:string;
    displayPicture:string;
    active:boolean;
    topics:any;
    stats:Stats;
    createdAt:any;
    lastModifiedAt:any;
    customAttributes:any;
    [prop:string]:any;
}

class Group extends RESTObject<IGroup>{

    constructor(){
        super(API.GROUPS.GROUP);
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
                description:'',
                displayPicture:'',
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
                topics:{},
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new Group();
        }

        this.overloadables.creationPacket = () => {
            return {
                title:this.data.title||'',
                description:this.data.description||'',
                displayPicture:this.data.displayPicture||'',
                customAttributes:this.data.customAttributes||{}
            }
        }
    
        this.overloadables.updationPacket = () => {
            return {
                title:this.data.title||'',
                description:this.data.description||'',
                displayPicture:this.data.displayPicture||'',
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

    setDraft(data:{title:string,body:string,tags:string[]}){
        this.data.draft.title = data.title;
        this.data.draft.body = data.body;
        this.data.draft.tags = data.tags;
    }

    setPublished(data:{title:string,body:string,tags:string[]}){
        this.data.published.title = data.title;
        this.data.published.body = data.body;
        this.data.published.tags = data.tags;
    }

    setStatus(status:string){
        this.data.status = status;
    }

    getPublished(){
        return {...this.data.published,_id:this.data._id};
    }

}

export {
    IGroup,
    Group
}