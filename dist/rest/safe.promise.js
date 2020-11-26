"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings_1 = require("../utils/Strings");
//import * as Invoker from '../../utils/factory/invoker';
function default_1(promise) {
    console.log('safe.promise', promise);
    return new Promise((resolve, reject) => {
        promise.then((result) => {
            console.log('safe.promise', 'result', result);
            resolve(result);
        }).catch((error) => {
            console.log('safe.promise', 'error', error, Strings_1.default.ERROR.NETWORK_ERROR, error.message);
            if (error.message === Strings_1.default.ERROR.TOKEN_EMPTY || error.message === Strings_1.default.ERROR.REFRESH_TOKEN_EXPIRED) {
                console.log('Sign In Required', '');
            }
            else if (error.message === Strings_1.default.ERROR.NETWORK_ERROR) {
                console.log('safe.promise', 'redirect');
                console.log('/oops');
            }
            else {
                reject(error);
            }
        });
    });
}
exports.default = default_1;
