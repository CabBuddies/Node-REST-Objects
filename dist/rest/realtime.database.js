"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("firebase");
require("firebase/firestore");
class RealtimeDatabase {
    constructor() {
        this.getApp = ({ options }) => {
            //console.log({});
            if (options) {
                this.app = !firebase_1.default.apps.length
                    ? firebase_1.default.initializeApp(options).firestore().app
                    : firebase_1.default.app().firestore().app;
            }
            return this.app;
        };
        this.getDb = ({ options, url }) => {
            //console.log({url});
            if (url)
                return this.getApp({ options }).database(url);
            return this.getApp({ options }).database();
        };
        this.getPath = ({ options, url, path }) => {
            //console.log({url,path});
            if (path)
                return this.getDb({ options, url }).ref(path);
            return this.getDb({ options, url }).ref();
        };
        this.pushToPath = ({ options, url, path, value }) => {
            //console.log({url,path,value});
            value = value || {};
            return new Promise((resolve, reject) => {
                this.getPath({ options, url, path }).push(value, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        };
        this.observePath = ({ options, url, path, event, quickDelete, callback }) => {
            callback = callback || ((snapshot) => { });
            const deleteFunction = quickDelete ?
                (id) => {
                    this.getPath({ options, url, path: path + '/' + id }).remove();
                } :
                (id) => { };
            event = event || 'child_added';
            this.getPath({ options, url, path }).on(event, (snapshot) => {
                callback(snapshot);
                setTimeout(() => {
                    deleteFunction(snapshot.key);
                }, 10000);
            });
        };
    }
}
exports.default = new RealtimeDatabase();
