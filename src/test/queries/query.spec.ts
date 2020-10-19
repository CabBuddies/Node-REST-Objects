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

describe('Query',()=>{
    describe('Create',()=>{
        it('HappyCase', async function () {

            await Auth.login('nihal+test1@cabbuddies.com','strong');

            let query:Query = new Query();

            query.setDraft({
                title:'Sample Title Draft',
                body:'Sample Body Draft',
                tags:['d1','d2']
            });

            query.setPublished({
                title:'Sample Title Published',
                body:'Sample Body Published',
                tags:['p1','p2']
            });

            query.setStatus('draft');
            
            expect(query.data._id).equal('');

            await query.create();

            console.log(query.data);

            expect(query.data._id).not.equal('');

        });
    })
})