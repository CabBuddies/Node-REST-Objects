interface Token {
    value: string;
    expiryTime: number;
}
declare class Headers {
    data: {
        userId: string;
        accessToken: {
            value: string;
            expiryTime: number;
        };
        refreshToken: {
            value: string;
            expiryTime: number;
        };
        isConfirmed: boolean;
    };
    backupManager: any;
    setBackupManager(bm: any): void;
    isUserLoggedIn(): boolean;
    setUserId(userId: string): string;
    getUserId(): string;
    getAccessToken(): {
        value: string;
        expiryTime: number;
    };
    getRefreshToken(): {
        value: string;
        expiryTime: number;
    };
    setAccessToken(value: string, expiryTime: number): {
        value: string;
        expiryTime: number;
    };
    setRefreshToken(value: string, expiryTime: number): {
        value: string;
        expiryTime: number;
    };
    isUserConfirmed(): boolean;
    setUserConfirmed(isConfirmed: boolean): boolean;
    backupData(): void;
    loadDataRaw(userId: string, accessToken: Token, refreshToken: Token, isConfirmed: boolean): void;
}
declare const _default: Headers;
export default _default;
