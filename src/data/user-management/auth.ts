import headers from '../../rest/headers';
import * as RestOperations from '../../rest/rest.operations';
import Headers from '../../rest/headers';
import { API } from '../../rest/api';

const register = async function(email:string,password:string,firstName:string,lastName:string,registrationType:string){
    
    return RestOperations.postOp(API.USER_MANAGEMENT.AUTH.SIGN_UP,{email,password,firstName,lastName,registrationType}).then((result)=>{

        console.log('Register Result',result.data);
    
        Headers.setAccessToken(result.data.accessToken.value,result.data.accessToken.expiryTime);
        Headers.setRefreshToken(result.data.refreshToken.value,result.data.refreshToken.expiryTime);

        return result;
    })

    //console.log(Headers);
}

const login = async function(email:string,password:string){
    
    return RestOperations.postOp(API.USER_MANAGEMENT.AUTH.SIGN_IN,{email,password}).then((result)=>{

        console.log('Login Result',result.data);
    
        Headers.setAccessToken(result.data.accessToken.value,result.data.accessToken.expiryTime);
        Headers.setRefreshToken(result.data.refreshToken.value,result.data.refreshToken.expiryTime);

        return result;
    })

    //console.log(Headers);
}

const signOut = async function () {
    return RestOperations.deleteOp(API.USER_MANAGEMENT.AUTH.SIGN_OUT).then((result)=>{

        console.log('SignOut Result',result.data);
    
        Headers.setAccessToken('',0);
        Headers.setRefreshToken('',0);

        return result;
    })
}

export {
    register,
    login,
    signOut
}