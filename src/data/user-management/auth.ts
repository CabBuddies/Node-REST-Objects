import * as RestOperations from '../../rest/rest.operations';
import Headers from '../../rest/headers';
import { refreshAPI } from '../../rest/api';
import Factory from '../../utils/factory';
import binderKeys from '../../utils/factory/binder.keys';
import {User} from './user';

const getFullProfile = (promise:Promise<any>,getProfile:boolean=true) => {
    return new Promise((resolve,reject)=>{
        promise.then(async(result)=>{
            
            if(result.data.userId)
                Headers.setUserId(result.data.userId);
            
            if(result.data.accessToken)
                Headers.setAccessToken(result.data.accessToken.value,result.data.accessToken.expiryTime);
            
            if(result.data.refreshToken)
                Headers.setRefreshToken(result.data.refreshToken.value,result.data.refreshToken.expiryTime);
            
            if(result.data.isConfirmed !== undefined)
                Headers.setUserConfirmed(result.data.isConfirmed);

            Headers.backupData();
            
            return result;
        }).then((result)=>{
            if(!getProfile){
                resolve(result)
            }else{
                const user = new User();
                user.getMe().then(()=>{
                    result.data.profile=user.data;
                    resolve(result)
                }).catch((err)=>{
                    resolve(result)
                });
            }
        }).catch((err)=>{
            reject(err);
        })
    })
}

const register = async function(email:string,password:string,firstName:string,lastName:string,registrationType:'inapp'|'google',displayPicture:string=''){
    
    return getFullProfile(RestOperations.postOp(refreshAPI().USER_MANAGEMENT.AUTH.SIGN_UP,{email,password,firstName,lastName,registrationType,displayPicture}))
    
}

const login = async function(email:string,password:string){
    
    return getFullProfile(RestOperations.postOp(refreshAPI().USER_MANAGEMENT.AUTH.SIGN_IN,{email,password}))
    
}

const getMe = async function(){
    return RestOperations.getOp(refreshAPI().USER_MANAGEMENT.AUTH.ME);
}

const getAccessToken = async function(){
    console.log('Auth','getAccessToken',refreshAPI().USER_MANAGEMENT.AUTH.ACCESS_TOKEN)
    return getFullProfile(RestOperations.getOp(refreshAPI().USER_MANAGEMENT.AUTH.ACCESS_TOKEN,true))
}

const sendConfirmationToken = async function(){
    return RestOperations.getOp(refreshAPI().USER_MANAGEMENT.AUTH.SEND_CONFIRMATION_TOKEN);
}

const confirmToken = async function(token:string) {
    return getFullProfile(RestOperations.postOp(refreshAPI().USER_MANAGEMENT.AUTH.CONFIRMATION_TOKEN,{token}))
}

const signOut = async function () {
    return getFullProfile(RestOperations.deleteOp(refreshAPI().USER_MANAGEMENT.AUTH.SIGN_OUT,true),false);
}

const signOutAll = async function () {
    return getFullProfile(RestOperations.deleteOp(refreshAPI().USER_MANAGEMENT.AUTH.SIGN_OUT_ALL,true),false);
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