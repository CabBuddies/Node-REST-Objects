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
const queries_1 = require("../data/queries");
const user_management_1 = require("../data/user-management");
const realtime_database_1 = require("../rest/realtime.database");
const search_rest_object_1 = require("../rest/search.rest.object");
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(10); }, ms);
    });
}
const firebaseConfig = {
    apiKey: "AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60",
    authDomain: "cabbuddies-1562982601192.firebaseapp.com",
    databaseURL: "https://cabbuddies-1562982601192.firebaseio.com",
    projectId: "cabbuddies-1562982601192",
    storageBucket: "cabbuddies-1562982601192.appspot.com",
    messagingSenderId: "1067716858916",
    appId: "1:1067716858916:web:298c461c0439c497d5b4b1",
    measurementId: "G-VQLJ1DMMJ5"
};
function testSearchUtil(attributes, search = '') {
    const _data = [];
    search
        .trim()
        .toLowerCase()
        .replace(/  +/g, ' ')
        .split(' ')
        .forEach((s) => {
        attributes.forEach((attr) => {
            const data = {};
            data[attr] = { $regex: `.*${s}.*`, $options: "i" };
            console.log(data);
            _data.push(JSON.parse(JSON.stringify(data)));
        });
    });
    console.log(_data);
    return { $or: _data };
}
function searchUser(search = '', attributes) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new user_management_1.User();
            const sro = new search_rest_object_1.default(user);
            sro.request.query = testSearchUtil(["fullName", "email"], search);
            console.log(sro.request.query);
            yield sleep(5000);
            sro.request.sort = {
                "firstName": 1
            };
            sro.request.pageSize = 10;
            if (attributes)
                sro.request.attributes = attributes;
            yield sro.search();
            sro.response.result.forEach((u) => console.log(u.data.email));
            return sro;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function liveUserSuggestion(search) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sro = yield searchUser(search, ['firstName', 'lastName', 'userId']);
            return sro.response.result.map((u) => {
                const { userId, firstName, lastName } = u.data;
                return { userId, firstName, lastName };
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
function searchQuery(search = '', attributes) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = new queries_1.Query();
            const sro = new search_rest_object_1.default(query);
            sro.request.query = testSearchUtil(["published.title", "published.body"], search);
            console.log(sro.request.query);
            sro.request.sort = {
                "lastModifiedAt": 1
            };
            sro.request.pageSize = 10;
            if (attributes)
                sro.request.attributes = attributes;
            yield sro.search();
            sro.response.result.forEach((u) => console.log(u.data.published.title));
            return sro.response.result;
        }
        catch (error) {
            console.error(error);
        }
        return [];
    });
}
function liveQuerySuggestion(search) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sro = yield searchQuery(search, ['published.title', 'published.tags', 'author', 'stats']);
            return sro.map((u) => {
                return u.data;
            });
        }
        catch (error) {
            console.error(error);
        }
        return [];
    });
}
function sendFollowRequest(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRelation = new user_management_1.UserRelation();
            userRelation.data.followeeId.userId = userId;
            userRelation.data.status = 'requested';
            yield userRelation.create();
            return userRelation;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function unfollowUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRelation = new user_management_1.UserRelation();
            userRelation.data.followeeId.userId = userId;
            yield userRelation.create();
            return userRelation;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function isFollowing(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRelation = new user_management_1.UserRelation();
            userRelation.data.followeeId.userId = userId;
            yield userRelation.read(true);
            return userRelation;
        }
        catch (error) {
            console.error(error);
        }
        return false;
    });
}
function notificationsChannel() {
    return __awaiter(this, void 0, void 0, function* () {
        realtime_database_1.default.getApp({ options: firebaseConfig });
        yield sleep(2000);
        const userId = '5f59b8fc6368501be25f253e';
        realtime_database_1.default.observePath({ path: '/user/' + userId, quickDelete: true, callback: (snapshot) => {
                console.log(snapshot.key, JSON.stringify(snapshot.val(), null, 2));
            } });
        yield user_management_1.Auth.register('nihal+google1@cabbuddies.com', 'strong', 'Nihal', 'Konda', 'google');
        yield sleep(2000);
        console.log(yield sendFollowRequest(userId));
        yield sleep(20000);
    });
}
notificationsChannel();
