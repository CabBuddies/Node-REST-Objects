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
exports.login = void 0;
const RestOperations = require("../../rest/rest.operations");
const headers_1 = require("../../rest/headers");
const login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield RestOperations.postOp('http://localhost:4000/api/v1/auth/sign_in', { email, password });
        console.log('Login Result', result.data);
        headers_1.default.setAccessToken(result.data.accessToken.value);
        headers_1.default.setRefreshToken(result.data.refreshToken.value);
        //console.log(Headers);
    });
};
exports.login = login;
