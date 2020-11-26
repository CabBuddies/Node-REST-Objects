"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Headers {
    constructor() {
        this.data = {
            userId: '',
            accessToken: {
                value: '',
                expiryTime: 0
            },
            refreshToken: {
                value: '',
                expiryTime: 0
            },
            isConfirmed: false
        };
    }
    setBackupManager(bm) {
        this.backupManager = bm;
    }
    isUserLoggedIn() {
        console.log('Headers', 'isUserLoggedIn', this.data.accessToken.expiryTime);
        return this.data.accessToken.expiryTime > 0;
    }
    setUserId(userId) {
        this.data.userId = userId;
        return this.data.userId;
    }
    getUserId() {
        return this.data.userId;
    }
    getAccessToken() {
        return this.data.accessToken;
    }
    getRefreshToken() {
        return this.data.refreshToken;
    }
    setAccessToken(value, expiryTime) {
        this.data.accessToken = {
            value,
            expiryTime
        };
        return this.getAccessToken();
    }
    setRefreshToken(value, expiryTime) {
        this.data.refreshToken = {
            value,
            expiryTime
        };
        return this.getRefreshToken();
    }
    isUserConfirmed() {
        return this.data.isConfirmed;
    }
    setUserConfirmed(isConfirmed) {
        this.data.isConfirmed = isConfirmed;
        return this.data.isConfirmed;
    }
    backupData() {
        console.log('backup', JSON.stringify(this.data));
        try {
            this.backupManager(this.data);
        }
        catch (error) {
        }
    }
    /*
    backupData(){
        if(window && window.localStorage && window.localStorage.setItem)
            window.localStorage.setItem('backup',JSON.stringify(this.data));
    }

    loadData(){
        let data = {
            userId:'',
            accessToken:{
                value:'',
                expiryTime:0
            },refreshToken:{
                value:'',
                expiryTime:0
            },
            isConfirmed:false
        };
        try {
            let temp:any = {};

            if(window && window.localStorage && window.localStorage.getItem)
                temp = JSON.parse(window.localStorage.getItem('backup'));

            console.log('Headers','loadData','temp',temp)

            this.loadDataRaw(
                temp.userId||data.userId||'',
                temp.accessToken||data.accessToken||{value:'',expiryTime:0},
                temp.refreshToken||data.refreshToken||{value:'',expiryTime:0},
                temp.isConfirmed||data.isConfirmed||false
            )

        } catch (error) {
            console.error(error);
        }
    }
    */
    loadDataRaw(userId, accessToken, refreshToken, isConfirmed) {
        this.data = { userId, accessToken, refreshToken, isConfirmed };
    }
}
exports.default = new Headers();
