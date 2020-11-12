"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAPI = exports.DOMAIN = exports.API = void 0;
const DOMAIN = {
    USER_MANAGEMENT: 'http://localhost:4000',
    QUERIES: 'http://localhost:4001',
    GROUPS: 'http://localhost:4002'
};
exports.DOMAIN = DOMAIN;
let BASE_PATH = {
    USER_MANAGEMENT: {
        AUTH: DOMAIN.USER_MANAGEMENT + '/api/v1/auth',
        USER: DOMAIN.USER_MANAGEMENT + '/api/v1/user'
    },
    QUERIES: {
        QUERY: DOMAIN.QUERIES + '/api/v1/query',
        RESPONSE: DOMAIN.QUERIES + '/api/v1/query/:queryId/response',
        COMMENT: function () {
            if (this.data.responseId) {
                return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/response/' + this.data.responseId + '/comment';
            }
            else {
                return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/comment';
            }
        },
        OPINION: function () {
            if (this.data.responseId) {
                return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/response/' + this.data.responseId + '/opinion';
            }
            else {
                return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/opinion';
            }
        },
        TAG: DOMAIN.QUERIES + '/api/v1/tag'
    },
    GROUPS: {
        GROUP: DOMAIN.GROUPS + '/api/v1/group',
        POST: DOMAIN.GROUPS + '/api/v1/post',
        REPLY: DOMAIN.GROUPS + '/api/v1/reply',
        OPINION: DOMAIN.GROUPS + '/api/v1/opinion'
    }
};
let API = {
    USER_MANAGEMENT: {
        AUTH: {
            BASE: BASE_PATH.USER_MANAGEMENT.AUTH,
            SIGN_UP: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_up',
            SIGN_IN: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_in',
            ACCESS_TOKEN: BASE_PATH.USER_MANAGEMENT.AUTH + '/access_token',
            SIGN_OUT: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_out',
            SIGN_OUT_ALL: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_out_all'
        },
        USER: {
            BASE: BASE_PATH.USER_MANAGEMENT.USER,
            ME: BASE_PATH.USER_MANAGEMENT.USER + '/me'
        }
    },
    QUERIES: BASE_PATH.QUERIES,
    GROUPS: BASE_PATH.GROUPS
};
exports.API = API;
const refreshAPI = () => {
    BASE_PATH = {
        USER_MANAGEMENT: {
            AUTH: DOMAIN.USER_MANAGEMENT + '/api/v1/auth',
            USER: DOMAIN.USER_MANAGEMENT + '/api/v1/user'
        },
        QUERIES: {
            QUERY: DOMAIN.QUERIES + '/api/v1/query',
            RESPONSE: DOMAIN.QUERIES + '/api/v1/query/:queryId/response',
            COMMENT: function () {
                if (this.data.responseId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/response/' + this.data.responseId + '/comment';
                }
                else {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/comment';
                }
            },
            OPINION: function () {
                if (this.data.responseId) {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/response/' + this.data.responseId + '/opinion';
                }
                else {
                    return DOMAIN.QUERIES + '/api/v1/query/' + this.data.queryId + '/opinion';
                }
            },
            TAG: DOMAIN.QUERIES + '/api/v1/tag'
        },
        GROUPS: {
            GROUP: DOMAIN.GROUPS + '/api/v1/group',
            POST: DOMAIN.GROUPS + '/api/v1/post',
            REPLY: DOMAIN.GROUPS + '/api/v1/reply',
            OPINION: DOMAIN.GROUPS + '/api/v1/opinion'
        }
    };
    exports.API = API = {
        USER_MANAGEMENT: {
            AUTH: {
                BASE: BASE_PATH.USER_MANAGEMENT.AUTH,
                SIGN_UP: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_up',
                SIGN_IN: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_in',
                ACCESS_TOKEN: BASE_PATH.USER_MANAGEMENT.AUTH + '/access_token',
                SIGN_OUT: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_out',
                SIGN_OUT_ALL: BASE_PATH.USER_MANAGEMENT.AUTH + '/sign_out_all'
            },
            USER: {
                BASE: BASE_PATH.USER_MANAGEMENT.USER,
                ME: BASE_PATH.USER_MANAGEMENT.USER + '/me'
            }
        },
        QUERIES: BASE_PATH.QUERIES,
        GROUPS: BASE_PATH.GROUPS
    };
};
exports.refreshAPI = refreshAPI;
