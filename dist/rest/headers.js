"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Headers {
    constructor() {
        this.accessToken = {
            value: '',
            expiryTime: 0
        };
        this.refreshToken = {
            value: '',
            expiryTime: 0
        };
    }
    getAccessToken() {
        return this.accessToken;
    }
    getRefreshToken() {
        return this.refreshToken;
    }
    setAccessToken(value, expiryTime) {
        this.accessToken = {
            value,
            expiryTime
        };
        return this.getAccessToken();
    }
    setRefreshToken(value, expiryTime) {
        this.refreshToken = {
            value,
            expiryTime
        };
        return this.getRefreshToken();
    }
}
exports.default = new Headers();
