"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAPI = exports.DOMAIN = void 0;
const headers_1 = require("./headers");
let DOMAIN = {
    USER_MANAGEMENT: 'http://localhost:4000',
    QUERIES: 'http://localhost:4001',
    GROUPS: 'http://localhost:4002'
};
exports.DOMAIN = DOMAIN;
const refreshAPI = (domain) => {
    if (domain) {
        exports.DOMAIN = DOMAIN = domain;
    }
    const BASE_PATH = {
        USER_MANAGEMENT: {
            AUTH: DOMAIN.USER_MANAGEMENT + '/api/v1/auth',
            USER: DOMAIN.USER_MANAGEMENT + '/api/v1/user'
        },
        QUERIES: {
            QUERY: DOMAIN.QUERIES + '/api/v1/query',
            ACCESS: function () {
                if (this.data.queryId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/access';
                }
                else {
                    return DOMAIN.QUERIES + '/api/v1/user/USER_ID/access';
                }
            },
            RESPONSE: function () {
                if (this.data.queryId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/response';
                }
                else {
                    return DOMAIN.QUERIES + '/api/v1/user/USER_ID/response';
                }
            },
            COMMENT: function () {
                console.log('qId', this.data.queryId, 'rId', this.data.responseId);
                if (this.data.responseId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/response/' + this.data.responseId + '/comment';
                }
                else if (this.data.queryId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/comment';
                }
                else {
                    return DOMAIN.QUERIES + '/api/v1/user/USER_ID/comment';
                }
            },
            OPINION: function () {
                if (this.data.responseId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/response/' + this.data.responseId + '/opinion';
                }
                else if (this.data.queryId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/opinion';
                }
                else {
                    return DOMAIN.QUERIES + '/api/v1/user/USER_ID/opinion';
                }
            },
            TAG: DOMAIN.QUERIES + '/api/v1/tag'
        },
        GROUPS: {
            GROUP: DOMAIN.GROUPS + '/api/v1/group',
            ACCESS: function () {
                return DOMAIN.GROUPS + '/api/v1/group/' + this.data.groupId + '/access';
            },
            POST: function () {
                return DOMAIN.GROUPS + '/api/v1/group/' + this.data.groupId + '/post';
            },
            REPLY: function () {
                return DOMAIN.GROUPS + '/api/v1/group/' + this.data.groupId + '/post' + this.data.postId + '/reply';
            },
            OPINION: function () {
                if (this.data.responseId) {
                    return DOMAIN.GROUPS + '/api/v1/group/' + this.data.groupId + '/post/' + this.data.postId + '/opinion';
                }
                else {
                    return DOMAIN.GROUPS + '/api/v1/group/' + this.data.groupId + '/opinion';
                }
            }
        }
    };
    return {
        USER_MANAGEMENT: {
            AUTH: {
                BASE: BASE_PATH.USER_MANAGEMENT.AUTH,
                SIGN_UP: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_up',
                SIGN_IN: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_in',
                ACCESS_TOKEN: BASE_PATH.USER_MANAGEMENT.AUTH + '/access_token',
                ME: BASE_PATH.USER_MANAGEMENT.AUTH + '/me',
                SEND_CONFIRMATION_TOKEN: BASE_PATH.USER_MANAGEMENT.AUTH + '/send_confirmation_token',
                CONFIRMATION_TOKEN: BASE_PATH.USER_MANAGEMENT.AUTH + '/confirmation_token',
                SIGN_OUT: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_out',
                SIGN_OUT_ALL: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_out_all'
            },
            USER: {
                BASE: BASE_PATH.USER_MANAGEMENT.USER,
                ME: BASE_PATH.USER_MANAGEMENT.USER + '/me',
                //RELATION:BASE_PATH.USER_MANAGEMENT.USER+'/relation',
                RELATION: function () {
                    let userId = '*';
                    if (this.data.followeeId && this.data.followeeId.userId) {
                        userId = this.data.followeeId.userId;
                    }
                    else if (this.data.followerId && this.data.followerId.userId) {
                        userId = this.data.followerId.userId;
                    }
                    else if (headers_1.default.isUserConfirmed()) {
                        userId = headers_1.default.getUserId();
                    }
                    else {
                        throw new Error('Please set followeeId or followerId of UserRelation');
                    }
                    return BASE_PATH.USER_MANAGEMENT.USER + '/' + userId + '/relation';
                }
            }
        },
        QUERIES: BASE_PATH.QUERIES,
        GROUPS: BASE_PATH.GROUPS
    };
};
exports.refreshAPI = refreshAPI;
refreshAPI();
/**
 *
 
let BASE_PATH = {
    USER_MANAGEMENT:{
        AUTH:DOMAIN.USER_MANAGEMENT+'/api/v1/auth',
        USER:DOMAIN.USER_MANAGEMENT+'/api/v1/user'
    },
    QUERIES:{
        QUERY:DOMAIN.QUERIES+'/api/v1/query',
        ACCESS:function(){
            if(this.data.queryId){
                return DOMAIN.QUERIES+'/api/v1/query/'+this.data.queryId+'/access';
            }else{
                return DOMAIN.QUERIES+'/api/v1/user/USER_ID/access';
            }
        },
        RESPONSE:function(){
            if(this.data.queryId){
                return DOMAIN.QUERIES+'/api/v1/query/'+this.data.queryId+'/response';
            }else{
                return DOMAIN.QUERIES+'/api/v1/user/USER_ID/response';
            }
        },
        COMMENT:function(){
            console.log('qId',this.data.queryId,'rId',this.data.responseId);
            if(this.data.queryId && this.data.responseId){
                return DOMAIN.QUERIES+'/api/v1/query/'+this.data.queryId+'/response/'+this.data.responseId+'/comment';
            }else if(this.data.queryId){
                return DOMAIN.QUERIES+'/api/v1/query/'+this.data.queryId+'/comment';
            }else{
                return DOMAIN.QUERIES+'/api/v1/user/USER_ID/comment';
            }
        },
        OPINION:function(){
            if(this.data.responseId){
                return DOMAIN.QUERIES+'/api/v1/query/'+this.data.queryId+'/response/'+this.data.responseId+'/opinion';
            }else if(this.data.queryId){
                return DOMAIN.QUERIES+'/api/v1/query/'+this.data.queryId+'/opinion';
            }else{
                return DOMAIN.QUERIES+'/api/v1/user/USER_ID/opinion';
            }
        },
        TAG:DOMAIN.QUERIES+'/api/v1/tag'
    },
    GROUPS:{
        GROUP:DOMAIN.GROUPS+'/api/v1/group',
        ACCESS:function(){
            return DOMAIN.GROUPS+'/api/v1/group/'+this.data.groupId+'/access';
        },
        POST:function(){
            return DOMAIN.GROUPS+'/api/v1/group/'+this.data.groupId+'/post';
        },
        REPLY:function(){
            return DOMAIN.GROUPS+'/api/v1/group/'+this.data.groupId+'/post'+this.data.postId+'/reply';
        },
        OPINION:function(){
            if(this.data.responseId){
                return DOMAIN.GROUPS+'/api/v1/group/'+this.data.groupId+'/post/'+this.data.postId+'/opinion';
            }else{
                return DOMAIN.GROUPS+'/api/v1/group/'+this.data.groupId+'/opinion';
            }
        }
    }
};

let API = {
    USER_MANAGEMENT:{
        AUTH:{
            BASE:BASE_PATH.USER_MANAGEMENT.AUTH,
            SIGN_UP:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_up',
            SIGN_IN:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_in',
            ACCESS_TOKEN:BASE_PATH.USER_MANAGEMENT.AUTH+'/access_token',
            ME:BASE_PATH.USER_MANAGEMENT.AUTH+'/me',
            SEND_CONFIRMATION_TOKEN:BASE_PATH+'/send_confirmation_token',
            CONFIRMATION_TOKEN:BASE_PATH+'/confirmation_token',
            SIGN_OUT:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_out',
            SIGN_OUT_ALL:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_out_all'
        },
        USER:{
            BASE:BASE_PATH.USER_MANAGEMENT.USER,
            ME:BASE_PATH.USER_MANAGEMENT.USER+'/me',
            //RELATION:BASE_PATH.USER_MANAGEMENT.USER+'/relation',
            RELATION:function(){
                return BASE_PATH.USER_MANAGEMENT.USER+'/'+this.data.followeeId.userId+'/relation';
            }
        }
    },
    QUERIES:BASE_PATH.QUERIES,
    GROUPS:BASE_PATH.GROUPS
};

 *
 */ 
