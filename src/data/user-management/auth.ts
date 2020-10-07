import headers from '../../rest/headers';
import * as RestOperations from '../../rest/rest.operations';
import Headers from '../../rest/headers';
const login = async function(email:string,password:string){
    let result = await RestOperations.postOp('http://localhost:4000/api/v1/auth/sign_in',{email,password});
    console.log('Login Result',result.data);
    Headers.setAccessToken(result.data.accessToken.value);
    Headers.setRefreshToken(result.data.refreshToken.value);
    //console.log(Headers);
}

export {
    login
}