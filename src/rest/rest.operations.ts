import axios from 'axios';
import Headers from './headers';

const restOptions = function(refresh:boolean=false){
    return {
        headers:{
            'Authorization':'Access '+Headers.getAccessToken().value,
            'Content-Type': 'application/json'
        },
        happy:0
    }
}

function throwError(s,e){
    const error = new Error();
    error.message = JSON.stringify(e);
    error.name = s.toString();
    throw error;
}

const postOp = async function(url:string,data:any,refresh:boolean=false){
    try {
        return await axios.post(url,data,restOptions(refresh));
    } catch (error) {
        throwError(error.response.status,error.response.data);
    }
    return {data:{}};
};

const getOp = async function(url:string,data:object={},refresh:boolean=false){
    try {
        return await axios({
            method:'GET',
            url,
            data,
            ...restOptions(refresh),    
        });
    } catch (error) {
        throwError(error.response.status,error.response.data);
    }
    return {data:{}};
};

const putOp = async function(url:string,data:any,refresh:boolean=false){
    try {
        return await axios.put(url,data,restOptions(refresh));
    } catch (error) {        
        throwError(error.response.status,error.response.data);
    }
    return {data:{}};
};

const deleteOp = async function(url:string,refresh:boolean=false){
    try {
        return await axios.delete(url,restOptions(refresh));
    } catch (error) {
        throwError(error.response.status,error.response.data);
    }
    return {data:{}};
}

export {
    postOp,
    getOp,
    putOp,
    deleteOp
}