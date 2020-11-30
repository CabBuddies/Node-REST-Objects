"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDirectChatMessage = exports.listenLiveMessages = exports.connectToFirebase = void 0;
const headers_1 = require("../../rest/headers");
const realtime_database_1 = require("../../rest/realtime.database");
const MessageTypes = {
    NTF: 'NTF', DCMSG: 'DCMSG', GCMSG: 'GCMSG'
};
function connectToFirebase(options) {
    return realtime_database_1.default.getApp({ options });
}
exports.connectToFirebase = connectToFirebase;
function listenLiveMessages({ directChatMessageReceived, groupChatMessageReceived, notificationReceived, otherMessageReceived }) {
    if (headers_1.default.isUserLoggedIn() === false)
        return false;
    realtime_database_1.default.observePath({
        path: '/user/' + headers_1.default.getUserId(),
        quickDelete: true,
        callback: (snapshot) => {
            const value = snapshot.val();
            if (value.type === MessageTypes.NTF) {
                notificationReceived(value);
            }
            else if (value.type === MessageTypes.DCMSG) {
                directChatMessageReceived(value);
            }
            else if (value.type === MessageTypes.GCMSG) {
                groupChatMessageReceived(value);
            }
            else {
                otherMessageReceived(value);
            }
        }
    });
    return true;
}
exports.listenLiveMessages = listenLiveMessages;
function sendDirectChatMessage(receipientUserId, message) {
    if (headers_1.default.isUserLoggedIn() === false)
        return new Promise((resolve, reject) => { reject('Unauthorized'); });
    const messageObject = { from: headers_1.default.getUserId(), message, ts: new Date() };
    return realtime_database_1.default.pushToPath({
        path: '/user/' + receipientUserId,
        value: messageObject
    });
}
exports.sendDirectChatMessage = sendDirectChatMessage;
// export function sendGroupChatMessage(groupId:string,message:string){
//     if(headers.isUserLoggedIn()===false)return new Promise((resolve,reject)=>{reject('Unauthorized');});
//     const messageObject:IGroupChatMessage = {from:headers.getUserId(),message,timestamp:new Date()};
//     return realtimeDatabase.pushToPath({
//         path:'/user/'+receipientUserId,
//         value:messageObject
//     });
// }
