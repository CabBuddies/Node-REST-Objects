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
const RestOperations = require("./rest.operations");
class RESTObject {
    //searchRestObject:SearchRESTObject<T>;
    constructor(api) {
        this.overloadables = {
            init: () => {
                this.data = {};
            },
            newInstance: () => {
                return null;
            },
            loadPartialContent: (preview) => {
                //console.log('loadPartialContent',preview);
                this.setData(this.copyJSON(this.getData(), preview));
            },
            formulateCreateUrl: () => {
                return this.api();
            },
            formulateReadUrl: (full = false) => {
                return this.api() + '/' + this.data["_id"] + (full ? '?full=true' : '');
            },
            formulateSearchUrl: (pageSize, pageNum) => {
                return this.api() + "/search?pageSize=" + pageSize + "&pageNum=" + pageNum;
            },
            formulateUpdateUrl: () => {
                return this.api() + '/' + this.data["_id"];
            },
            formulateDeleteUrl: () => {
                return this.api() + '/' + this.data["_id"];
            },
            creationPacket: () => {
                return this.data;
            },
            updationPacket: () => {
                return this.data;
            }
        };
        if (api.constructor === ''.constructor)
            this.api = function () { return api; };
        else
            this.api = api;
        //this.searchRestObject = new SearchRESTObject(this);
        this.overloadables.init();
    }
    getApi() {
        return this.api;
    }
    getData() {
        return this.data;
    }
    // setApi(api:string){
    //     this.api = api;
    //     return this.getApi();
    // }
    setData(data) {
        this.data = data;
        return this.getData();
    }
    copyJSON(target, source) {
        //console.log(target,source);
        for (const k of Object.keys(source)) {
            target[k] = (source[k].constructor.name === 'Object') ? this.copyJSON(target[k] || {}, source[k]) : source[k];
        }
        return target;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('POST', this.overloadables.formulateReadUrl(), this.overloadables.creationPacket());
            // this.data = <T> ((await RestOperations.postOp(this.api,this.overloadables.creationPacket())).data);
            this.overloadables.loadPartialContent((yield RestOperations.postOp(this.overloadables.formulateReadUrl(), this.overloadables.creationPacket())).data);
        });
    }
    read(full = false) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GET', this.overloadables.formulateReadUrl(full), this.data["_id"]);
            this.overloadables.loadPartialContent((yield RestOperations.getOp(this.overloadables.formulateReadUrl(full))).data);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('PUT', this.overloadables.formulateUpdateUrl(), this.overloadables.updationPacket());
            this.overloadables.loadPartialContent((yield RestOperations.putOp(this.overloadables.formulateUpdateUrl(), this.overloadables.updationPacket())).data);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('DELETE', this.overloadables.formulateDeleteUrl(), this.data["_id"]);
            this.overloadables.loadPartialContent((yield RestOperations.deleteOp(this.overloadables.formulateDeleteUrl())).data);
        });
    }
}
exports.default = RESTObject;
