interface Token {
    value: string;
    expiryTime: number;
}
declare class Headers {
    accessToken: Token;
    refreshToken: Token;
    getAccessToken(): Token;
    getRefreshToken(): Token;
    setAccessToken(value: string, expiryTime: number): Token;
    setRefreshToken(value: string, expiryTime: number): Token;
}
declare const _default: Headers;
export default _default;
