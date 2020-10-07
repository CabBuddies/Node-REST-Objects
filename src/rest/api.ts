const DOMAIN = {
    USER_MANAGEMENT:'http://localhost:4000',
    QUERIES:'http://localhost:4001',
    GROUPS:'http://localhost:4002'
};

const BASE_PATH = {
    USER_MANAGEMENT:{
        AUTH:DOMAIN.USER_MANAGEMENT+'/api/v1/auth',
        USER:DOMAIN.USER_MANAGEMENT+'/api/v1/user'
    },
    QUERIES:{
        QUERY:DOMAIN.QUERIES+'/api/v1/query',
        RESPONSE:DOMAIN.QUERIES+'/api/v1/response',
        COMMENT:DOMAIN.QUERIES+'/api/v1/comment',
        OPINION:DOMAIN.QUERIES+'/api/v1/opinion',
        TAG:DOMAIN.QUERIES+'/api/v1/tag'
    }
}

const API = {
    USER_MANAGEMENT:{
        AUTH:{
            BASE:BASE_PATH.USER_MANAGEMENT.AUTH,
            SIGN_UP:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_up',
            SIGN_IN:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_in',
            ACCESS_TOKEN:BASE_PATH.USER_MANAGEMENT.AUTH+'/access_token',
            SIGN_OUT:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_out',
            SIGN_OUT_ALL:BASE_PATH.USER_MANAGEMENT.AUTH+'/sign_out_all'
        },
        USER:{
            BASE:BASE_PATH.USER_MANAGEMENT.USER,
            ME:BASE_PATH.USER_MANAGEMENT.USER+'/me'
        }
    },
    QUERIES:BASE_PATH.QUERIES
};

export {
    API
}