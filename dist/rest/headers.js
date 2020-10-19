"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Headers {
    getAccessToken() {
        return this.accessToken || '';
    }
    getRefreshToken() {
        return this.refreshToken || '';
    }
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        return this.getAccessToken();
    }
    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
        return this.getRefreshToken();
    }
}
exports.default = new Headers();
