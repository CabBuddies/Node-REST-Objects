"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth = require("../data/user-management/auth");
const query_1 = require("../data/queries/query");
const tq_opinion_1 = require("../data/queries/tq.opinion");
const comment_1 = require("../data/queries/comment");
const groups_1 = require("../data/groups");
const search_rest_object_1 = require("../rest/search.rest.object");
const user_relation_1 = require("../data/user-management/user.relation");
const headers_1 = require("../rest/headers");
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(10); }, ms);
    });
}
function test1() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.register('nihal+test+1@cabbuddies.com', 'strong', 'n', 'k', 'inapp');
        let query = new query_1.Query();
        query.setDraft({
            title: 'Sample Title',
            body: 'Sample Body',
            tags: ['d1', 'd2']
        });
        query.setPublished({
            title: 'Sample Title Published NK',
            body: 'Sample Body Published',
            tags: ['p1', 'p2']
        });
        query.setStatus('draft');
        query.data.author.email = 'fake';
        console.log('\n\n\ncreationPacket', query.overloadables.creationPacket());
        yield query.create();
        console.log('\n\n\ncreatedPacket', query.data);
    });
}
function test2() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test1@cabbuddies.com', 'strong');
        let query = new query_1.Query();
        query.setDraft({
            title: 'Sample Title',
            body: 'Sample Body',
            tags: ['d1', 'd2']
        });
        query.setPublished({
            title: 'Sample Title Published NK',
            body: 'Sample Body Published',
            tags: ['p1', 'p2']
        });
        query.setStatus('draft');
        query.data.author.email = 'fake';
        console.log('\n\n\ncreationPacket', query.overloadables.creationPacket());
        yield query.create();
        console.log('\n\n\ncreatedPacket', query.data);
        let query2 = new query_1.Query();
        query2.set_id(query.get_id());
        console.log('\n\n\nbeforeReadPacket', query2.data);
        yield query2.read();
        console.log('\n\n\nafterReadPacket', query2.data);
        query2.setDraft({
            title: 'Sample Title Updated',
            body: 'Sample Body',
            tags: ['d1', 'd2', 'd3']
        });
        console.log('\n\n\nafterEditPacket', query2.data);
        console.log('\n\n\nupdationPacket', query2.overloadables.updationPacket());
        yield query2.update();
        console.log('\n\n\nupdatedPacket', query2.data);
        yield query2.delete();
        console.log('\n\n\ndeletedPacket', query2.data);
    });
}
function test3() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = new query_1.Query();
        const searchRestObject = new search_rest_object_1.default(query);
        searchRestObject.setRequest({ query: {}, sort: { "createdAt": -1 }, pageSize: 5 });
        yield searchRestObject.search();
        for (const _q of searchRestObject.response.result) {
            const q = _q;
            console.log('q preread', q.data);
            // await q.read();
            // console.log(
            //     'q postread',
            //     q.data,
            //     '\n\n\n'
            // );
        }
    });
}
function test4() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test1@cabbuddies.com', 'strong');
        let query = new query_1.Query();
        query.setDraft({
            title: 'Sample Title',
            body: 'Sample Body',
            tags: ['d1', 'd2']
        });
        query.setPublished({
            title: 'Sample Title Published NK',
            body: 'Sample Body Published',
            tags: ['p1', 'p2']
        });
        query.setStatus('draft');
        query.data.author.email = 'fake';
        console.log('\n\n\ncreationPacket', query.overloadables.creationPacket());
        yield query.create();
        console.log('\n\n\ncreatedPacket', query.data);
        let opinion = new tq_opinion_1.TQOpinion();
        opinion.data.opinionType = 'upvote';
        opinion.data.queryId = query.get_id();
        console.log('\n\n\ncreationPacket', opinion.overloadables.creationPacket());
        yield opinion.create();
        console.log('\n\n\ncreatedPacket', opinion.data);
        yield sleep(3000);
        console.log('\n\n\nbeforeReadPacket', query.data);
        yield query.read();
        console.log('\n\n\nafterReadPacket', query.data);
    });
}
function test5() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test1@cabbuddies.com', 'strong');
        let query = new query_1.Query();
        const searchRestObject = new search_rest_object_1.default(query);
        searchRestObject.setRequest({ sort: { "createdAt": -1 }, pageSize: 2 });
        yield searchRestObject.search();
        query = searchRestObject.response.result[0];
        console.log('\n\n\ncreatedPacket', query.data);
        let comment = new comment_1.Comment();
        comment.data.body = 'happy';
        comment.data.queryId = query.get_id();
        console.log('\n\n\ncreationPacket', comment.overloadables.creationPacket());
        yield comment.create();
        console.log('\n\n\ncreatedPacket', comment.data);
        yield sleep(3000);
        console.log('\n\n\nbeforeReadPacket', query.data);
        yield query.read();
        console.log('\n\n\nafterReadPacket', query.data);
    });
}
function test6() {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = new comment_1.Comment();
        const searchRestObject = new search_rest_object_1.default(comment);
        searchRestObject.setRequest({ sort: { "createdAt": -1 }, pageSize: 2 });
        yield searchRestObject.search();
        for (const _q of searchRestObject.response.result) {
            const q = _q;
            console.log('q preread', q.data);
            yield q.read();
            console.log('q postread', q.data, '\n\n\n');
        }
    });
}
function test7() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test1@cabbuddies.com', 'strong');
        const group = new groups_1.Group();
        group.data.title = 'Sample Title';
        group.data.description = 'Sample Description';
        group.data.topics = ['topic1', 'topic2'];
        console.log(group.getApi());
        console.log(group.overloadables.creationPacket());
        yield sleep(2000);
        yield group.create();
        console.log('post create', group.data);
        const group2 = new groups_1.Group();
        group2.data._id = group.data._id;
        yield sleep(2000);
        yield group2.read();
        console.log('post read', group2.data);
        group2.data.displayPicture = 'highresimg.png';
        yield sleep(2000);
        yield group2.update();
        console.log('post update', group2.data);
        yield sleep(2000);
        yield group2.delete();
        console.log('post delete', group2.data);
    });
}
function test8() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test2@cabbuddies.com', 'strong');
        //5f59b8fc6368501be25f253e
        yield Auth.sendConfirmationToken();
    });
}
function test8b() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test2@cabbuddies.com', 'strong');
        //5f59b8fc6368501be25f253e
        console.log(yield Auth.confirmToken('892326'));
    });
}
function test9() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test2@cabbuddies.com', 'strong');
        //5f59b8fc6368501be25f253e
        const userRelation = new user_relation_1.UserRelation();
        userRelation.setFolloweeId('5f59b8fc6368501be25f253e');
        userRelation.setStatus('requested');
        yield userRelation.create();
        console.log(userRelation);
    });
}
function test10() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test1@cabbuddies.com', 'strong');
        //5f59b8fc6368501be25f253e
        const userRelation = new user_relation_1.UserRelation();
        userRelation.data.followeeId.userId = headers_1.default.getUserId();
        const userRelationSearch = new search_rest_object_1.default(userRelation);
        userRelationSearch.request.query = {
            "followeeId": headers_1.default.getUserId(),
            "status": "requested"
        };
        userRelationSearch.request.query = {
            "$and": [
                {
                    "status": "accepted"
                },
                {
                    "$or": [
                        {
                            "followeeId": headers_1.default.getUserId()
                        },
                        {
                            "followerId": headers_1.default.getUserId()
                        }
                    ]
                }
            ]
        };
        yield userRelationSearch.search();
        userRelationSearch.response.result.forEach((r) => {
            console.log(r);
        });
    });
}
function test11() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test1@cabbuddies.com', 'strong');
        //5fc0168f6363047390a37e74
        const userRelation = new user_relation_1.UserRelation();
        userRelation.set_id('5fc0168f6363047390a37e74');
        userRelation.setFolloweeId('5f59b8fc6368501be25f253e');
        userRelation.setStatus('accepted');
        yield userRelation.update();
        console.log(userRelation.data);
    });
}
function test12() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Auth.login('nihal+test1@cabbuddies.com', 'strong');
        const comment = new comment_1.Comment();
        const commentSearch = new search_rest_object_1.default(comment);
        const qId = '101';
        const rIds = ['102', '103', '104'];
        const fetchQ = false;
        const sq = [];
        if (fetchQ) {
            sq.push({
                "queryId": qId,
                "responseId": "none"
            });
        }
        rIds.forEach((r) => {
            sq.push({
                "queryId": qId,
                "responseId": r
            });
        });
        commentSearch.request.pageSize = sq.length * 5;
        commentSearch.request.query = {
            $or: sq
        };
        yield commentSearch.search();
        console.log(commentSearch.response.query);
        commentSearch.response.result.forEach(comment => {
            console.log(comment.data);
        });
    });
}
const realtime_database_1 = require("../rest/realtime.database");
function test13() {
    const options = {
        apiKey: "AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60",
        authDomain: "cabbuddies-1562982601192.firebaseapp.com",
        databaseURL: "https://cabbuddies-1562982601192.firebaseio.com",
        projectId: "cabbuddies-1562982601192",
        storageBucket: "cabbuddies-1562982601192.appspot.com",
        messagingSenderId: "1067716858916",
        appId: "1:1067716858916:web:298c461c0439c497d5b4b1",
        measurementId: "G-VQLJ1DMMJ5"
    };
    realtime_database_1.default.getApp({ options });
    realtime_database_1.default.observePath({ path: '/user/102', callback: (val) => { console.log('val', val); } });
}
//test13();
// Auth.login('nihal+test+1@cabbuddies.com','strong').then((result:any)=>{
//     console.log('login',result.data.profile);
//     Auth.getAccessToken().then((result:any)=>{
//         console.log('getAccessToken',result.data.profile);
//         Auth.signOutAll().then((result:any)=>{
//             console.log('signOutAll',result.data.profile);
//         }).catch((error)=>{
//             console.error(error);
//         })
//     }).catch((error)=>{
//         console.error(error);
//     })
// }).catch((error)=>{
//     console.error(error);
// })
// query2.setDraft({
//     title:'Sample Title Updated',
//     body:'Sample Body Updated',
//     tags:['d1','d2','d3']
// });
// query2 = <Query> await queryRestObject.update(query2.updationPacket());
// console.log('\n\n\nafterUpdatePacket',query2);
