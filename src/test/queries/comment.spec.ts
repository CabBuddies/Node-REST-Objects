import {assert,expect,should} from 'chai';
import { Comment } from '../../data/queries';

import {Auth} from '../../data/user-management';
import SearchRESTObject from '../../rest/search.rest.object';

console.log(describe,it)

function sleep(ms){
    return new Promise(function(resolve,reject){
        setTimeout(function(){resolve(10)},ms);
    })
}

describe('Comment',()=>{
    describe('Search',()=>{
        it('HappyCase', async function () {
            await Auth.login('nihal+test1@cabbuddies.com','strong');

            let comment:Comment = new Comment();

            comment.data.queryId = '5f7e50334ce343255bd306b6';

            const searchRestObject = new SearchRESTObject(comment);

            searchRestObject.setRequest({
                sort:{"createdAt":-1},
                pageSize:2
            });

            await searchRestObject.search();

            console.log(searchRestObject.response.query);

            searchRestObject.response.result.forEach((comment:Comment)=>{
                console.log(comment.data);
            });

        });
    })
})