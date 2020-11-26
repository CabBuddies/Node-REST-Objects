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
exports.signOutAll = exports.signOut = exports.confirmToken = exports.sendConfirmationToken = exports.getAccessToken = exports.getMe = exports.login = exports.register = void 0;
const RestOperations = require("../../rest/rest.operations");
const headers_1 = require("../../rest/headers");
const api_1 = require("../../rest/api");
const factory_1 = require("../../utils/factory");
const binder_keys_1 = require("../../utils/factory/binder.keys");
const register = function (email, password, firstName, lastName, registrationType) {
    return __awaiter(this, void 0, void 0, function* () {
        return RestOperations.postOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_UP, { email, password, firstName, lastName, registrationType }).then((result) => {
            console.log('Register Result', result.data);
            headers_1.default.setUserId(result.data.userId);
            headers_1.default.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
            headers_1.default.setRefreshToken(result.data.refreshToken.value, result.data.refreshToken.expiryTime);
            headers_1.default.setUserConfirmed(result.data.isConfirmed);
            headers_1.default.backupData();
            return result;
        });
    });
};
exports.register = register;
const login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return RestOperations.postOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_IN, { email, password }).then((result) => {
            console.log('Login Result', result.data);
            headers_1.default.setUserId(result.data.userId);
            headers_1.default.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
            headers_1.default.setRefreshToken(result.data.refreshToken.value, result.data.refreshToken.expiryTime);
            headers_1.default.setUserConfirmed(result.data.isConfirmed);
            headers_1.default.backupData();
            return result;
        });
    });
};
exports.login = login;
const getMe = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return RestOperations.getOp(api_1.API.USER_MANAGEMENT.AUTH.ME);
    });
};
exports.getMe = getMe;
const getAccessToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Auth', 'getAccessToken', api_1.API.USER_MANAGEMENT.AUTH.ACCESS_TOKEN);
        return RestOperations.getOp(api_1.API.USER_MANAGEMENT.AUTH.ACCESS_TOKEN, true).then((result) => {
            console.log('getAccessToken Result', result.data);
            headers_1.default.setUserId(result.data.userId);
            headers_1.default.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
            headers_1.default.setUserConfirmed(result.data.isConfirmed);
            headers_1.default.backupData();
            return result;
        });
    });
};
exports.getAccessToken = getAccessToken;
const sendConfirmationToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return RestOperations.getOp(api_1.API.USER_MANAGEMENT.AUTH.SEND_CONFIRMATION_TOKEN);
    });
};
exports.sendConfirmationToken = sendConfirmationToken;
const confirmToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        return RestOperations.postOp(api_1.API.USER_MANAGEMENT.AUTH.CONFIRMATION_TOKEN, { token }).then((result) => {
            console.log('confirmToken Result', result.data);
            headers_1.default.setUserId(result.data.userId);
            headers_1.default.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
            headers_1.default.setRefreshToken(result.data.refreshToken.value, result.data.refreshToken.expiryTime);
            headers_1.default.setUserConfirmed(result.data.isConfirmed);
            headers_1.default.backupData();
            return result;
        });
    });
};
exports.confirmToken = confirmToken;
const signOut = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return RestOperations.deleteOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_OUT, true).then((result) => {
            console.log('SignOut Result', result.data);
            headers_1.default.setUserId('');
            headers_1.default.setAccessToken('', 0);
            headers_1.default.setRefreshToken('', 0);
            headers_1.default.setUserConfirmed(false);
            headers_1.default.backupData();
            return result;
        });
    });
};
exports.signOut = signOut;
const signOutAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return RestOperations.deleteOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_OUT_ALL, true).then((result) => {
            console.log('SignOutAll Result', result.data);
            headers_1.default.setUserId('');
            headers_1.default.setAccessToken('', 0);
            headers_1.default.setRefreshToken('', 0);
            headers_1.default.setUserConfirmed(false);
            headers_1.default.backupData();
            return result;
        });
    });
};
exports.signOutAll = signOutAll;
factory_1.default.bindFunction(binder_keys_1.default.AUTH_GET_ACCESS_TOKEN, getAccessToken);
