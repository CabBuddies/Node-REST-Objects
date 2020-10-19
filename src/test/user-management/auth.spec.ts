import {assert,expect,should} from 'chai';
import { Query,Comment } from '../../data/queries';

import {Auth} from '../../data/user-management';
import SearchRESTObject from '../../rest/search.rest.object';

console.log(describe,it)

function sleep(ms){
    return new Promise(function(resolve,reject){
        setTimeout(function(){resolve(10)},ms);
    })
}

describe('Auth',()=>{
    describe('Create',()=>{
        it('HappyCase', async function () {

            // Auth.register('nihal+test10@cabbuddies.com','strong','Nihal','Konda','inapp').then((result)=>{
            //     console.log('happy',result);
            // }).catch((err)=>{
            //     console.log('err',err);
            //     console.log('err.name',err.name);
            //     console.log('err.message',err.message);
            // });

            try {
                const result = await Auth.login('nihal+test1@cabbuddies.com','strong');

                console.log(result);

                
            } catch (error) {
                console.error(error);
            }

            // await Auth.login('nihal+test1@cabbuddies.com','strong');
            
        });
    })
})