"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishTokenExpired = exports.publishLoginStatusChanged = void 0;
const _1 = require(".");
// const createToast = (title:string,body:string) => { 
//     PubSub.publishMessage(Topic.TOAST.NEW_MESSAGE,{title,body});
// }
const publishLoginStatusChanged = () => {
    _1.PubSub.publishMessage(_1.Topic.AUTH.LOGIN_STATUS_CHANGED, {});
};
exports.publishLoginStatusChanged = publishLoginStatusChanged;
const publishTokenExpired = () => {
    _1.PubSub.publishMessage(_1.Topic.AUTH.TOKEN_EXPIRED, {});
};
exports.publishTokenExpired = publishTokenExpired;
