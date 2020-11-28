import { IUser, User } from "../data/user-management";
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
        
    }
}

liveUserSuggestion('nih').then((result)=>{
    console.log(result);
}).catch((error)=>{

})

