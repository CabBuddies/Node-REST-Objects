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
exports.deleteOp = exports.putOp = exports.getOp = exports.postOp = void 0;
const axios_1 = require("axios");
const headers_1 = require("./headers");
const restOptions = function (refresh = false) {
    return {
        headers: {
            'Authorization': 'Access ' + headers_1.default.getAccessToken().value,
            'Content-Type': 'application/json'
        },
        happy: 0
    };
};
function throwError(s, e) {
    const error = new Error();
    error.message = JSON.stringify(e);
    error.name = s.toString();
    throw error;
}
const postOp = function (url, data, refresh = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield axios_1.default.post(url, data, restOptions(refresh));
        }
        catch (error) {
            if (!error.response)
                error.response = { status: 503, data: 'Service Unavailable' };
            throwError(error.response.status, error.response.data);
        }
        return { data: {} };
    });
};
exports.postOp = postOp;
const getOp = function (url, refresh = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield axios_1.default.get(url, restOptions(refresh));
        }
        catch (error) {
            if (!error.response)
                error.response = { status: 503, data: 'Service Unavailable' };
            throwError(error.response.status, error.response.data);
        }
        return { data: {} };
    });
};
exports.getOp = getOp;
const putOp = function (url, data, refresh = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield axios_1.default.put(url, data, restOptions(refresh));
        }
        catch (error) {
            if (!error.response)
                error.response = { status: 503, data: 'Service Unavailable' };
            throwError(error.response.status, error.response.data);
        }
        return { data: {} };
    });
};
exports.putOp = putOp;
const deleteOp = function (url, refresh = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield axios_1.default.delete(url, restOptions(refresh));
        }
        catch (error) {
            if (!error.response)
                error.response = { status: 503, data: 'Service Unavailable' };
            throwError(error.response.status, error.response.data);
        }
        return { data: {} };
    });
};
exports.deleteOp = deleteOp;
