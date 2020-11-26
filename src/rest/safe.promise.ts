import Strings from "../utils/Strings";
//import * as Invoker from '../../utils/factory/invoker';

export default function(promise:Promise<any>){
    console.log('safe.promise',promise);
    return new Promise((resolve,reject)=>{
        promise.then((result)=>{
            console.log('safe.promise','result',result);
            resolve(result);
        }).catch((error)=>{
            console.log('safe.promise','error',error,Strings.ERROR.NETWORK_ERROR,error.message);
            if(error.message === Strings.ERROR.TOKEN_EMPTY || error.message === Strings.ERROR.REFRESH_TOKEN_EXPIRED){
                console.log('Sign In Required','');
            }else if(error.message === Strings.ERROR.NETWORK_ERROR){
                console.log('safe.promise','redirect');
                console.log('/oops');
            }else{
                reject(error);
            }
        })
    })
}