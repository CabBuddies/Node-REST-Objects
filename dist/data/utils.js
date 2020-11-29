"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deIdfy = void 0;
function deIdfy(json) {
    if (json.constructor !== {}.constructor) {
        return json;
    }
    delete json['_id'];
    for (const key of Object.keys(json)) {
        json[key] = deIdfy(json[key]);
    }
    return json;
}
exports.deIdfy = deIdfy;
