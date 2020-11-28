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
const user_1 = require("./user");
const getFullProfile = (promise, getProfile = true) => {
    return new Promise((resolve, reject) => {
        promise.then((result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result.data.userId)
                headers_1.default.setUserId(result.data.userId);
            if (result.data.accessToken)
                headers_1.default.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
            if (result.data.refreshToken)
                headers_1.default.setRefreshToken(result.data.refreshToken.value, result.data.refreshToken.expiryTime);
            if (result.data.isConfirmed !== undefined)
                headers_1.default.setUserConfirmed(result.data.isConfirmed);
            headers_1.default.backupData();
            return result;
        })).then((result) => {
            if (!getProfile) {
                resolve(result);
            }
            else {
                const user = new user_1.User();
                user.getMe().then(() => {
                    result.data.profile = user.data;
                    resolve(result);
                }).catch((err) => {
                    resolve(result);
                });
            }
        }).catch((err) => {
            reject(err);
        });
    });
};
const register = function (email, password, firstName, lastName, registrationType, displayPicture = '') {
    return __awaiter(this, void 0, void 0, function* () {
        return getFullProfile(RestOperations.postOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_UP, { email, password, firstName, lastName, registrationType, displayPicture }));
    });
};
exports.register = register;
const login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return getFullProfile(RestOperations.postOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_IN, { email, password }));
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
        return getFullProfile(RestOperations.getOp(api_1.API.USER_MANAGEMENT.AUTH.ACCESS_TOKEN, true));
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
        return getFullProfile(RestOperations.postOp(api_1.API.USER_MANAGEMENT.AUTH.CONFIRMATION_TOKEN, { token }));
    });
};
exports.confirmToken = confirmToken;
const signOut = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return getFullProfile(RestOperations.deleteOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_OUT, true), false);
    });
};
exports.signOut = signOut;
const signOutAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return getFullProfile(RestOperations.deleteOp(api_1.API.USER_MANAGEMENT.AUTH.SIGN_OUT_ALL, true), false);
    });
};
exports.signOutAll = signOutAll;
factory_1.default.bindFunction(binder_keys_1.default.AUTH_GET_ACCESS_TOKEN, getAccessToken);
