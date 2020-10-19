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
const opinion_1 = require("../data/queries/opinion");
const comment_1 = require("../data/queries/comment");
const groups_1 = require("../data/groups");
const search_rest_object_1 = require("../rest/search.rest.object");
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(10); }, ms);
    });
}
function test1() {
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
        searchRestObject.setRequest({ query: { "stats.followCount": 0, "status": "deleted" }, sort: { "createdAt": -1 }, pageSize: 2 });
        yield searchRestObject.search();
        for (const _q of searchRestObject.response.result) {
            const q = _q;
            console.log('q preread', q.data);
            yield q.read();
            console.log('q postread', q.data, '\n\n\n');
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
        let opinion = new opinion_1.Opinion();
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
test5();
// query2.setDraft({
//     title:'Sample Title Updated',
//     body:'Sample Body Updated',
//     tags:['d1','d2','d3']
// });
// query2 = <Query> await queryRestObject.update(query2.updationPacket());
// console.log('\n\n\nafterUpdatePacket',query2);