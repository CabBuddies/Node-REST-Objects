import * as RestOperations from '../../rest/rest.operations';
import Headers from '../../rest/headers';
import { API } from '../../rest/api';
import Factory from '../../utils/factory';
import binderKeys from '../../utils/factory/binder.keys';

const register = async function(email:string,password:string,firstName:string,lastName:string,registrationType:string,displayPicture:string=''){
    
    return RestOperations.postOp(API.USER_MANAGEMENT.AUTH.SIGN_UP,{email,password,firstName,lastName,registrationType,displayPicture}).then((result)=>{

        console.log('Register Result',result.data);
        Headers.setUserId(result.data.userId);
        Headers.setAccessToken(result.data.accessToken.value,result.data.accessToken.expiryTime);
        Headers.setRefreshToken(result.data.refreshToken.value,result.data.refreshToken.expiryTime);
        Headers.setUserConfirmed(result.data.isConfirmed);
        Headers.backupData();

        return result;
    })
}

const login = async function(email:string,password:string){
    
    return RestOperations.postOp(API.USER_MANAGEMENT.AUTH.SIGN_IN,{email,password}).then((result)=>{

        console.log('Login Result',result.data);
        Headers.setUserId(result.data.userId);
        Headers.setAccessToken(result.data.accessToken.value,result.data.accessToken.expiryTime);
        Headers.setRefreshToken(result.data.refreshToken.value,result.data.refreshToken.expiryTime);
        Headers.setUserConfirmed(result.data.isConfirmed);
        Headers.backupData();

        return result;
    })
    
}

const getMe = async function(){
    return RestOperations.getOp(API.USER_MANAGEMENT.AUTH.ME);
}

const getAccessToken = async function(){
    console.log('Auth','getAccessToken',API.USER_MANAGEMENT.AUTH.ACCESS_TOKEN)
    return RestOperations.getOp(API.USER_MANAGEMENT.AUTH.ACCESS_TOKEN,true).then((result)=>{

        console.log('getAccessToken Result',result.data);
        Headers.setUserId(result.data.userId);
        Headers.setAccessToken(result.data.accessToken.value,result.data.accessToken.expiryTime);
        Headers.setUserConfirmed(result.data.isConfirmed);
        Headers.backupData();

        return result;
    });
}

const sendConfirmationToken = async function(){
    return RestOperations.getOp(API.USER_MANAGEMENT.AUTH.SEND_CONFIRMATION_TOKEN);
}

const confirmToken = async function(token:string) {
    return RestOperations.postOp(API.USER_MANAGEMENT.AUTH.CONFIRMATION_TOKEN,{token}).then((result)=>{

        console.log('confirmToken Result',result.data);
        Headers.setUserId(result.data.userId);
        Headers.setAccessToken(result.data.accessToken.value,result.data.accessToken.expiryTime);
        Headers.setRefreshToken(result.data.refreshToken.value,result.data.refreshToken.expiryTime);
        Headers.setUserConfirmed(result.data.isConfirmed);
        Headers.backupData();

        return result;
    })
}

const signOut = async function () {
    return RestOperations.deleteOp(API.USER_MANAGEMENT.AUTH.SIGN_OUT,true).then((result)=>{

        console.log('SignOut Result',result.data);
        Headers.setUserId('');
        Headers.setAccessToken('',0);
        Headers.setRefreshToken('',0);
        Headers.setUserConfirmed(false);
        Headers.backupData();

        return result;
    })
}

const signOutAll = async function () {
    return RestOperations.deleteOp(API.USER_MANAGEMENT.AUTH.SIGN_OUT_ALL,true).then((result)=>{

        console.log('SignOutAll Result',result.data);
        Headers.setUserId('');
        Headers.setAccessToken('',0);
        Headers.setRefreshToken('',0);
        Headers.setUserConfirmed(false);
        Headers.backupData();

        return result;
    })
}

Factory.bindFunction(binderKeys.AUTH_GET_ACCESS_TOKEN,getAccessToken);

export {
    register,
    login,
    getMe,
    getAccessToken,
    sendConfirmationToken,
    confirmToken,
    signOut,
    signOutAll
}