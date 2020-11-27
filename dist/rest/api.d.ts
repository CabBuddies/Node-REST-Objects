declare const DOMAIN: {
    USER_MANAGEMENT: string;
    QUERIES: string;
    GROUPS: string;
};
declare let API: {
    USER_MANAGEMENT: {
        AUTH: {
            BASE: string;
            SIGN_UP: string;
            SIGN_IN: string;
            ACCESS_TOKEN: string;
            ME: string;
            SEND_CONFIRMATION_TOKEN: string;
            CONFIRMATION_TOKEN: string;
            SIGN_OUT: string;
            SIGN_OUT_ALL: string;
        };
        USER: {
            BASE: string;
            ME: string;
            RELATION: () => string;
        };
    };
    QUERIES: {
        QUERY: string;
        ACCESS: () => string;
        RESPONSE: () => string;
        COMMENT: () => string;
        OPINION: () => string;
        TAG: string;
    };
    GROUPS: {
        GROUP: string;
        ACCESS: () => string;
        POST: () => string;
        REPLY: () => string;
        OPINION: () => string;
    };
};
declare const refreshAPI: () => void;
export { API, DOMAIN, refreshAPI };
