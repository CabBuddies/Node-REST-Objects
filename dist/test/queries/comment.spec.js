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
const queries_1 = require("../../data/queries");
const user_management_1 = require("../../data/user-management");
const search_rest_object_1 = require("../../rest/search.rest.object");
console.log(describe, it);
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(10); }, ms);
    });
}
describe('Comment', () => {
    describe('Search', () => {
        it('HappyCase', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_management_1.Auth.login('nihal+test1@cabbuddies.com', 'strong');
                let comment = new queries_1.Comment();
                comment.data.queryId = '5f7e50334ce343255bd306b6';
                const searchRestObject = new search_rest_object_1.default(comment);
                searchRestObject.setRequest({
                    sort: { "createdAt": -1 },
                    pageSize: 2
                });
                yield searchRestObject.search();
                console.log(searchRestObject.response.query);
                searchRestObject.response.result.forEach((comment) => {
                    console.log(comment.data);
                });
            });
        });
    });
});
