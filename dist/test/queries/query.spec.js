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
const chai_1 = require("chai");
const queries_1 = require("../../data/queries");
const user_management_1 = require("../../data/user-management");
console.log(describe, it);
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(10); }, ms);
    });
}
describe('Query', () => {
    describe('Create', () => {
        it('HappyCase', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_management_1.Auth.login('nihal+test1@cabbuddies.com', 'strong');
                let query = new queries_1.Query();
                query.setDraft({
                    title: 'Sample Title Draft',
                    body: 'Sample Body Draft',
                    tags: ['d1', 'd2']
                });
                query.setPublished({
                    title: 'Sample Title Published',
                    body: 'Sample Body Published',
                    tags: ['p1', 'p2']
                });
                query.setStatus('draft');
                chai_1.expect(query.data._id).equal('');
                yield query.create();
                console.log(query.data);
                chai_1.expect(query.data._id).not.equal('');
            });
        });
    });
});
