"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Factory {
    constructor() {
        this.map = {};
    }
    bindFunction(key, func) {
        this.map[key] = func;
    }
    boundFunction(key) {
        return this.map[key] || (() => { console.log('no function bound on ' + key); });
    }
}
exports.default = new Factory();
