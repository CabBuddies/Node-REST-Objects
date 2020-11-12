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
const groups_1 = require("../../data/groups");
const user_management_1 = require("../../data/user-management");
console.log(describe, it);
describe('Group', () => {
    describe('Create', () => {
        it('HappyCase', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield user_management_1.Auth.login('nihal+test1@cabbuddies.com', 'strong');
                let group = new groups_1.Group();
                group.data.title = 'Sample Title 1';
                group.data.description = 'Sample Description 1';
                group.data.displayPicture = 'highresimg.png';
                yield group.create();
                console.log(group.data);
                chai_1.expect(group.data._id.length > 0, 'Group Id is an empty string');
            });
        });
    });
});
