import RESTObject from '../../rest/rest.object';
import {Content,Stats} from './schemas';
import {IUser} from '../user-management/user';
import { refreshAPI } from '../../rest/api';

interface IQuery{
    _id:string;
    author:IUser;
    published:Content;
    draft:Content;
    createdAt;
    status:string;
    customAttributes;
    stats:Stats;
    access:string;
    [prop:string]:any;
}

class Query extends RESTObject<IQuery>{

    constructor(){
        super(refreshAPI().QUERIES.QUERY);
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
                createdAt:0,
                customAttributes:{},
                draft:{
                    _id:'',
                    title:'',
                    body:'',
                    tags:[],
                    media:[],
                    lastModifiedAt:0
                },
                published:{
                    _id:'',
                    title:'',
                    body:'',
                    tags:[],
                    media:[],
                    lastModifiedAt:0
                },
                stats:{
                    _id:'',
                    downVoteCount:0,
                    followCount:0,
                    responseCount:0,
                    score:0,
                    spamReportCount:0,
                    upVoteCount:0,
                    viewCount:0
                },
                status:'draft',
                access: 'public'
            });
        };

        this.overloadables.newInstance = () => {
            return new Query();
        }

        this.overloadables.creationPacket = () => {
            if(this.data.status){
                if(['draft','published'].indexOf(this.data.status) === -1)
                    this.data.status = 'draft';
            }
            return {
                published:{
                    title : this.data.published.title||'',
                    body : this.data.published.body||'',
                    tags : this.data.published.tags||[],
                    media : this.data.published.media||[]
                },
                draft:{
                    title : this.data.draft.title||'',
                    body : this.data.draft.body||'',
                    tags : this.data.draft.tags||[],
                    media : this.data.published.media||[]
                },
                status:this.data.status||'draft',
                access:this.data.access||'public',
                customAttributes:this.data.customAttributes||{}
            }
        }
    
        this.overloadables.updationPacket = () => {
            if(this.data.status){
                if(['draft','published'].indexOf(this.data.status) === -1)
                    this.data.status = 'draft';
            }
            return {
                published:{
                    title : this.data.published.title||'',
                    body : this.data.published.body||'',
                    tags : this.data.published.tags||[],
                    media : this.data.published.media||[]
                },
                draft:{
                    title : this.data.draft.title||'',
                    body : this.data.draft.body||'',
                    tags : this.data.draft.tags||[],
                    media : this.data.draft.media||[]
                },
                status:this.data.status||'draft',
                access:this.data.access||'public',
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
    IQuery,
    Query
}