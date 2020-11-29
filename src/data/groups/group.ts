import RESTObject from '../../rest/rest.object';
import {Stats} from './schemas';
import {IUser} from '../user-management/user';
import { refreshAPI } from '../../rest/api';
import {deIdfy} from '../utils';

interface ITime{
    _id:string;
    timestamp:any;
    isFlexible:boolean;
    flexibility:{
        early:any,
        late:any
    };
};

interface IPlace{
    _id:string;
    gps:{
        lat:number;
        lng:number;
    };
    address:{
        raw:string;
        addressLine1:string;
        addressLine2:string;
        city:string;
        state:string;
        country:string;
        zip:string;
    };
    isFlexible:boolean;
    flexibility:{
        miles:number;
    }
}

interface IGroup{
    _id:string;
    author:IUser;
    title:string;
    description:string;
    displayPicture:string;
    active:boolean;
    topics:any;
    plan:{
        origin:{
            time:ITime;
            place:IPlace;
        },
        destination:{
            time:ITime;
            place:IPlace;
        }
    };
    stats:Stats;
    createdAt:any;
    lastModifiedAt:any;
    customAttributes:any;
    access:{
        view:string,
        post:string
    },
    preferences:{
        automaticMembership:boolean;
    }
    [prop:string]:any;
}

class Group extends RESTObject<IGroup>{

    constructor(){
        super(refreshAPI().GROUPS.GROUP);
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
                    upvoteCount:0,
                    downvoteCount:0,
                    spamreportCount:0,
                    score:0
                },
                topics:[],
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0,
                access:{
                    view:'public',
                    post:'member'
                },
                preferences:{
                    automaticMembership:false
                },
                plan:{
                    origin:{
                        time:{
                            _id:'',
                            timestamp:0,
                            isFlexible:false,
                            flexibility:{
                                early:0,
                                late:0
                            }
                        },
                        place:{
                            _id:'',
                            gps:{
                                lat:0,
                                lng:0
                            },
                            isFlexible:false,
                            address:{
                                raw:'',
                                addressLine1:'',
                                addressLine2:'',
                                city:'',
                                country:'',
                                state:'',
                                zip:''
                            },
                            flexibility:{
                                miles:0
                            }
                        }
                    },
                    destination:{
                        time:{
                            _id:'',
                            timestamp:0,
                            isFlexible:false,
                            flexibility:{
                                early:0,
                                late:0
                            }
                        },
                        place:{
                            _id:'',
                            gps:{
                                lat:0,
                                lng:0
                            },
                            isFlexible:false,
                            address:{
                                raw:'',
                                addressLine1:'',
                                addressLine2:'',
                                city:'',
                                country:'',
                                state:'',
                                zip:''
                            },
                            flexibility:{
                                miles:0
                            }
                        }
                    }
                }
            });
        };

        this.overloadables.newInstance = () => {
            return new Group();
        }

        this.overloadables.creationPacket = () => {
            return deIdfy({
                title:this.data.title||'',
                description:this.data.description||'',
                displayPicture:this.data.displayPicture||'',
                plan:this.data.plan||{},
                access:this.data.access||{},
                preferences:this.data.preferences||{},
                customAttributes:this.data.customAttributes||{}
            })
        }
    
        this.overloadables.updationPacket = () => {
            return {
                title:this.data.title||'',
                description:this.data.description||'',
                displayPicture:this.data.displayPicture||'',
                plan:this.data.plan||{},
                access:this.data.access||{},
                preferences:this.data.preferences||{},
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
    IGroup,
    Group
}