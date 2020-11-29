import headers from "../../rest/headers";
import realtimeDatabase from "../../rest/realtime.database";

interface IDirectChatMessage{
    from:string,
    message:string,
    timestamp:any
}

interface IGroupChatMessage extends IDirectChatMessage{
    roomId:string
}

interface INotification{
    eventType:string,
    message:string,
    data:any
}

const MessageTypes = {
    NTF:'NTF',DCMSG:'DCMSG',GCMSG:'GCMSG'
}

export function connectToFirebase(options){
    return realtimeDatabase.getApp({options})
}

export function liveMessages({
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
                notificationReceived(value);
            }else if(value.type===MessageTypes.DCMSG){
                directChatMessageReceived(value);
            }else if(value.type===MessageTypes.GCMSG){
                groupChatMessageReceived(value);
            }else{
                otherMessageReceived(value);
            }
        }
    })
    return true;
}

export function sendDirectChatMessage(receipientUserId:string,message:string){
    if(headers.isUserLoggedIn()===false)return new Promise((resolve,reject)=>{reject('Unauthorized');});

    const messageObject:IDirectChatMessage = {from:headers.getUserId(),message,timestamp:new Date()};
    
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