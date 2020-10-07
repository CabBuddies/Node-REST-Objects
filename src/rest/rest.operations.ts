import axios from 'axios';
import Headers from './headers';

const restOptions = function(){
    return {
        headers:{
            'Authorization':'Access '+Headers.getAccessToken(),
            'Content-Type': 'application/json'
        },
        happy:0
    }
}

function throwError(e){
    const error = new Error();
    error.message = JSON.stringify(e);
    throw error;
}

const postOp = async function(url:string,data:any){
    try {
        return await axios.post(url,data,restOptions());
    } catch (error) {
        throwError(error.response.data);
    }
    return {data:{}};
};

const getOp = async function(url:string,data:object={}){
    try {
        return await axios({
            method:'GET',
            url,
            data,
            ...restOptions(),    
        });
    } catch (error) {
        throwError(error.response.data);
    }
    return {data:{}};
};

const putOp = async function(url:string,data:any){
    try {
        return await axios.put(url,data,restOptions());
    } catch (error) {        
        throwError(error.response.data);
    }
    return {data:{}};
};

const deleteOp = async function(url:string){
    try {
        return await axios.delete(url,restOptions());
    } catch (error) {
        throwError(error.response.data);
    }
    return {data:{}};
}

export {
    postOp,
    getOp,
    putOp,
    deleteOp
}