"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHandlers = void 0;
const Strings_1 = require("../utils/Strings");
//import * as Invoker from '../../utils/factory/invoker';
let handlers = {
    handleEmptyToken: () => { },
    handleExpiredRefreshToken: () => { },
    handleNetworkError: () => { }
};
function setHandlers(value) {
    handlers = value;
}
exports.setHandlers = setHandlers;
function safePromise(promise) {
    console.log('safe.promise', promise);
    return new Promise((resolve, reject) => {
        promise.then((result) => {
            console.log('safe.promise', 'result', result);
            resolve(result);
        }).catch((error) => {
            console.log('safe.promise', 'error', error, Strings_1.default.ERROR.NETWORK_ERROR, error.message);
            if (error.message === Strings_1.default.ERROR.TOKEN_EMPTY) {
                console.log('Sign In Required', '');
                handlers.handleEmptyToken();
            }
            else if (error.message === Strings_1.default.ERROR.REFRESH_TOKEN_EXPIRED) {
                console.log('Sign In Required', '');
                handlers.handleExpiredRefreshToken();
            }
            else if (error.message === Strings_1.default.ERROR.NETWORK_ERROR) {
                console.log('safe.promise', 'redirect');
                console.log('/oops');
                handlers.handleNetworkError();
            }
            else {
                reject(error);
            }
        });
    });
}
exports.default = safePromise;
