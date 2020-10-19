declare const API: {
    USER_MANAGEMENT: {
        AUTH: {
            BASE: string;
            SIGN_UP: string;
            SIGN_IN: string;
            ACCESS_TOKEN: string;
            SIGN_OUT: string;
            SIGN_OUT_ALL: string;
        };
        USER: {
            BASE: string;
            ME: string;
        };
    };
    QUERIES: {
        QUERY: string;
        RESPONSE: string;
        COMMENT: () => string;
        OPINION: () => string;
        TAG: string;
    };
    GROUPS: {
        GROUP: string;
        POST: string;
        REPLY: string;
        OPINION: string;
    };
};
export { API };
