import { IQuery, Query } from "../data/queries";
import { IUser, User, UserRelation } from "../data/user-management";
import SearchRESTObject from "../rest/search.rest.object";

function sleep(ms){
    return new Promise(function(resolve,reject){
        setTimeout(function(){resolve(10)},ms);
    })
}

function testSearchUtil(attributes:string[],search:string=''){
    const _data:any[] = [];
    search
        .trim()
        .toLowerCase()
        .replace(/  +/g, ' ')
        .split(' ')
        .forEach((s)=>{
            attributes.forEach((attr)=>{
                const data = {};
                data[attr] = {$regex: `.*${s}.*`, $options:"i"};
                console.log(data); 
                _data.push(JSON.parse(JSON.stringify(data)));
            })
        })
    console.log(_data);
    
    return { $or:_data }
}

async function searchUser(search:string='',attributes:string[]) {
    try {
        const user:User = new User();
        const sro:SearchRESTObject<IUser> = new SearchRESTObject(user);
        sro.request.query = testSearchUtil(["fullName","email"],search);
        console.log(sro.request.query);
        await sleep(5000);
        sro.request.sort = {
            "firstName":1
        };
        sro.request.pageSize=10;
        if(attributes)
            sro.request.attributes=attributes;
        await sro.search();
        sro.response.result.forEach((u)=>console.log(u.data.email));
        return sro;
    } catch (error) {
        console.error(error);
    }
}

async function liveUserSuggestion(search:string):Promise<any[]>{
    try {
        const sro = await searchUser(search,['firstName','lastName','userId']);
        return sro.response.result.map((u)=>{
            const {userId,firstName,lastName} = u.data;
            return {userId,firstName,lastName};
        })
    } catch (error) {
        console.error(error);
    }
}


async function searchQuery(search:string='',attributes:string[]) {
    try {
        const query:Query = new Query();
        const sro:SearchRESTObject<IQuery> = new SearchRESTObject(query);
        sro.request.query = testSearchUtil(["published.title","published.body"],search);
        console.log(sro.request.query);
        sro.request.sort = {
            "lastModifiedAt":1
        };
        sro.request.pageSize=10;
        if(attributes)
            sro.request.attributes=attributes;
        await sro.search();
        sro.response.result.forEach((u)=>console.log(u.data.published.title));
        return sro.response.result;
    } catch (error) {
        console.error(error);
    }
    return []
}

async function liveQuerySuggestion(search:string):Promise<any[]>{
    try {
        const sro = await searchQuery(search,['published.title','published.tags','author','stats']);
        return sro.map((u)=>{
            return u.data;
        })
    } catch (error) {
        console.error(error);
    }
    return [];
}

async function sendFollowRequest(userId:string) {
    try {
        const userRelation:UserRelation = new UserRelation();
        userRelation.data.followeeId.userId = userId;
        userRelation.data.status = 'requested';
        await userRelation.create();
        return userRelation;
    } catch (error) {
        console.error(error);
    }
}

async function unfollowUser(userId:string) {
    try {
        const userRelation:UserRelation = new UserRelation();
        userRelation.data.followeeId.userId = userId;
        await userRelation.create();
        return userRelation;
    } catch (error) {
        console.error(error);
    }
}

liveUserSuggestion('nih').then((result)=>{
    console.log(result);
}).catch((error)=>{

})

