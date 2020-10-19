interface Token{
    value:string,
    expiryTime:number
}

class Headers{
    accessToken:Token={
        value:'',
        expiryTime:0
    };
    refreshToken:Token={
        value:'',
        expiryTime:0
    };

    getAccessToken(){
        return this.accessToken;
    }

    getRefreshToken(){
        return this.refreshToken;
    }

    setAccessToken(value:string,expiryTime:number){
        this.accessToken = {
            value,
            expiryTime
        };
        return this.getAccessToken();
    }

    setRefreshToken(value:string,expiryTime:number){
        this.refreshToken = {
            value,
            expiryTime
        };
        return this.getRefreshToken();
    }
    
}

export default new Headers();