class Headers{
    accessToken:string;
    refreshToken:string;

    getAccessToken(){
        return this.accessToken||'';
    }

    getRefreshToken(){
        return this.refreshToken||'';
    }

    setAccessToken(accessToken:string){
        this.accessToken = accessToken;
        return this.getAccessToken();
    }

    setRefreshToken(refreshToken:string){
        this.refreshToken = refreshToken;
        return this.getRefreshToken();
    }
    
}

export default new Headers();