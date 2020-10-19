declare const DOMAIN: {
    USER_MANAGEMENT: string;
    QUERIES: string;
    GROUPS: string;
};
declare let API: any;
declare const refreshAPI: () => void;
export { API, DOMAIN, refreshAPI };
