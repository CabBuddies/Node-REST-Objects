import * as Auth from '../data/user-management/auth';
import {Query} from '../data/queries/query';
import {Opinion} from '../data/queries/opinion';
import {Comment} from '../data/queries/comment';

import {Group,Post,Reply,Opinion as GOpinion} from '../data/groups';

import SearchRESTObject from '../rest/search.rest.object';
import RESTObject from '../rest/rest.object';

function sleep(ms){
    return new Promise(function(resolve,reject){
        setTimeout(function(){resolve(10)},ms);
    })
}

async function test1(){
    await Auth.login('nihal+test1@cabbuddies.com','strong');

    let query:Query = new Query();

    query.setDraft({
        title:'Sample Title',
        body:'Sample Body',
        tags:['d1','d2']
    });

    query.setPublished({
        title:'Sample Title Published NK',
        body:'Sample Body Published',
        tags:['p1','p2']
    });

    query.setStatus('draft');

    query.data.author.email='fake';

    console.log('\n\n\ncreationPacket',query.overloadables.creationPacket());

    await query.create();

    console.log('\n\n\ncreatedPacket',query.data);

}

async function test2(){
    await Auth.login('nihal+test1@cabbuddies.com','strong');

    let query:Query = new Query();

    query.setDraft({
        title:'Sample Title',
        body:'Sample Body',
        tags:['d1','d2']
    });

    query.setPublished({
        title:'Sample Title Published NK',
        body:'Sample Body Published',
        tags:['p1','p2']
    });

    query.setStatus('draft');

    query.data.author.email='fake';

    console.log('\n\n\ncreationPacket',query.overloadables.creationPacket());

    await query.create();

    console.log('\n\n\ncreatedPacket',query.data);

    let query2 = new Query();

    query2.set_id(query.get_id());

    console.log('\n\n\nbeforeReadPacket',query2.data);

    await query2.read();

    console.log('\n\n\nafterReadPacket',query2.data);

    query2.setDraft({
        title:'Sample Title Updated',
        body:'Sample Body',
        tags:['d1','d2','d3']
    });

    console.log('\n\n\nafterEditPacket',query2.data);

    console.log('\n\n\nupdationPacket',query2.overloadables.updationPacket());

    await query2.update();

    console.log('\n\n\nupdatedPacket',query2.data);

    await query2.delete();

    console.log('\n\n\ndeletedPacket',query2.data);

}

async function test3(){
    const query = new Query();
    const searchRestObject = new SearchRESTObject(query);

    searchRestObject.setRequest({query:{},sort:{"createdAt":-1},pageSize:5});

    await searchRestObject.search();

    for(const _q of searchRestObject.response.result){
        const q = <Query> _q;
        console.log(
            'q preread',
            q.data
        );
        // await q.read();
        // console.log(
        //     'q postread',
        //     q.data,
        //     '\n\n\n'
        // );
    }
}

async function test4() {
    await Auth.login('nihal+test1@cabbuddies.com','strong');

    let query:Query = new Query();

    query.setDraft({
        title:'Sample Title',
        body:'Sample Body',
        tags:['d1','d2']
    });

    query.setPublished({
        title:'Sample Title Published NK',
        body:'Sample Body Published',
        tags:['p1','p2']
    });

    query.setStatus('draft');

    query.data.author.email='fake';

    console.log('\n\n\ncreationPacket',query.overloadables.creationPacket());

    await query.create();

    console.log('\n\n\ncreatedPacket',query.data);

    let opinion = new Opinion();

    opinion.data.opinionType='upvote';
    opinion.data.queryId=query.get_id();
    
    console.log('\n\n\ncreationPacket',opinion.overloadables.creationPacket());

    await opinion.create();

    console.log('\n\n\ncreatedPacket',opinion.data);

    await sleep(3000);

    console.log('\n\n\nbeforeReadPacket',query.data);

    await query.read();

    console.log('\n\n\nafterReadPacket',query.data);
}

async function test5() {
    await Auth.login('nihal+test1@cabbuddies.com','strong');

    let query:Query = new Query();

    const searchRestObject = new SearchRESTObject(query);

    searchRestObject.setRequest({sort:{"createdAt":-1},pageSize:2});

    await searchRestObject.search();

    query = <Query> searchRestObject.response.result[0];

    console.log('\n\n\ncreatedPacket',query.data);

    let comment = new Comment();

    comment.data.body = 'happy';

    comment.data.queryId=query.get_id();
    
    console.log('\n\n\ncreationPacket',comment.overloadables.creationPacket());

    await comment.create();

    console.log('\n\n\ncreatedPacket',comment.data);

    await sleep(3000);

    console.log('\n\n\nbeforeReadPacket',query.data);

    await query.read();

    console.log('\n\n\nafterReadPacket',query.data);
}

async function test6(){
    const comment = new Comment();
    const searchRestObject = new SearchRESTObject(comment);

    searchRestObject.setRequest({sort:{"createdAt":-1},pageSize:2});

    await searchRestObject.search();

    for(const _q of searchRestObject.response.result){
        const q = <Comment> _q;
        console.log(
            'q preread',
            q.data
        );
        await q.read();
        console.log(
            'q postread',
            q.data,
            '\n\n\n'
        );
    }
}

async function test7(){
    await Auth.login('nihal+test1@cabbuddies.com','strong');

    const group:Group = new Group();

    group.data.title = 'Sample Title';
    group.data.description = 'Sample Description';

    group.data.topics = ['topic1','topic2'];

    console.log(group.getApi());

    console.log(group.overloadables.creationPacket());

    await sleep(2000);

    await group.create();

    console.log('post create',group.data);

    const group2:Group = new Group();

    group2.data._id = group.data._id;

    await sleep(2000);

    await group2.read();

    console.log('post read',group2.data);

    group2.data.displayPicture = 'highresimg.png';

    await sleep(2000);

    await group2.update();

    console.log('post update',group2.data);

    await sleep(2000);

    await group2.delete();

    console.log('post delete',group2.data);

}

test3();

























// query2.setDraft({
//     title:'Sample Title Updated',
//     body:'Sample Body Updated',
//     tags:['d1','d2','d3']
// });

// query2 = <Query> await queryRestObject.update(query2.updationPacket());

// console.log('\n\n\nafterUpdatePacket',query2);