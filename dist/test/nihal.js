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
const search_rest_object_1 = require("../rest/search.rest.object");
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(10); }, ms);
    });
}
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
liveUserSuggestion('nih').then((result) => {
    console.log(result);
}).catch((error) => {
});
