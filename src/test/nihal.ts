import { IQuery, Query } from "../data/queries";
import { Auth, IUser, User, UserRelation } from "../data/user-management";
import realtimeDatabase from "../rest/realtime.database";
import SearchRESTObject from "../rest/search.rest.object";

function sleep(ms){
    return new Promise(function(resolve,reject){
        setTimeout(function(){resolve(10)},ms);
    })
}

const firebaseConfig = {
    apiKey: "AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60",
    authDomain: "cabbuddies-1562982601192.firebaseapp.com",
    databaseURL: "https://cabbuddies-1562982601192.firebaseio.com",
    projectId: "cabbuddies-1562982601192",
    storageBucket: "cabbuddies-1562982601192.appspot.com",
    messagingSenderId: "1067716858916",
    appId: "1:1067716858916:web:298c461c0439c497d5b4b1",
    measurementId: "G-VQLJ1DMMJ5"
};

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

async function isFollowing(userId:string){
    try {
        const userRelation:UserRelation = new UserRelation();
        userRelation.data.followeeId.userId = userId;
        await userRelation.read(true);
        return userRelation;
    } catch (error) {
        console.error(error);
    }
    return false;
}

async function notificationsChannel(){
    realtimeDatabase.getApp({options:firebaseConfig});
    await sleep(2000);
    const userId = '5f59b8fc6368501be25f253e';
    realtimeDatabase.observePath({path:'/user/'+userId,quickDelete:true,callback:(snapshot)=>{
        console.log(snapshot.key,JSON.stringify(snapshot.val(),null,2));
    }})
    await Auth.register('nihal+google1@cabbuddies.com','strong','Nihal','Konda','google');
    await sleep(2000);
    console.log(await sendFollowRequest(userId));
    await sleep(20000);
}

notificationsChannel();

