import headers from "../../rest/headers";
import realtimeDatabase from "../../rest/realtime.database";

enum MessageTypes {
    NTF='NTF',DCMSG='DCMSG',GCMSG='GCMSG'
}

interface IDirectChatMessage{
    type:MessageTypes
    from:string,
    message:string,
    ts:any
}

interface IGroupChatMessage extends IDirectChatMessage{
    roomId:string
}

interface INotification{
    type:MessageTypes,
    eventType:string,
    message:string,
    data:any
}


export function connectToFirebase(options){
    return realtimeDatabase.getApp({options})
}

export function listenLiveMessages({
        directChatMessageReceived,
        groupChatMessageReceived,
        notificationReceived,
        otherMessageReceived
    }:{
        directChatMessageReceived?(directMessage:IDirectChatMessage):any,
        groupChatMessageReceived?(groupMessage:IGroupChatMessage):any,
        notificationReceived?(notification:INotification):any,
        otherMessageReceived?(message:any):any,
    }){
    if(headers.isUserLoggedIn()===false)return false;
    realtimeDatabase.observePath({
        path:'/user/'+headers.getUserId(),
        quickDelete:true,
        callback:(snapshot)=>{
            const value = snapshot.val();
            if(value.type===MessageTypes.NTF){
                notificationReceived && notificationReceived(value);
            }else if(value.type===MessageTypes.DCMSG){
                directChatMessageReceived && directChatMessageReceived(value);
            }else if(value.type===MessageTypes.GCMSG){
                groupChatMessageReceived && groupChatMessageReceived(value);
            }else{
                otherMessageReceived && otherMessageReceived(value);
            }
        }
    })
    return true;
}

export function sendDirectChatMessage(receipientUserId:string,message:string){
    if(headers.isUserLoggedIn()===false)return new Promise((resolve,reject)=>{reject('Unauthorized');});

    const messageObject:IDirectChatMessage = {type:MessageTypes.DCMSG,from:headers.getUserId(),message,ts:new Date()};
    
    return realtimeDatabase.pushToPath({
        path:'/user/'+receipientUserId,
        value:messageObject
    });
}

// export function sendGroupChatMessage(groupId:string,message:string){
//     if(headers.isUserLoggedIn()===false)return new Promise((resolve,reject)=>{reject('Unauthorized');});

//     const messageObject:IGroupChatMessage = {from:headers.getUserId(),message,timestamp:new Date()};
    
//     return realtimeDatabase.pushToPath({
//         path:'/user/'+receipientUserId,
//         value:messageObject
//     });
// }