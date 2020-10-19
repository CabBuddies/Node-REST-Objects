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
const user_management_1 = require("../../data/user-management");
console.log(describe, it);
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(10); }, ms);
    });
}
describe('Auth', () => {
    describe('Create', () => {
        it('HappyCase', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Auth.register('nihal+test10@cabbuddies.com','strong','Nihal','Konda','inapp').then((result)=>{
                //     console.log('happy',result);
                // }).catch((err)=>{
                //     console.log('err',err);
                //     console.log('err.name',err.name);
                //     console.log('err.message',err.message);
                // });
                try {
                    const result = yield user_management_1.Auth.login('nihal+test1@cabbuddies.com', 'strong');
                    console.log(result);
                }
                catch (error) {
                    console.error(error);
                }
                // await Auth.login('nihal+test1@cabbuddies.com','strong');
            });
        });
    });
});
