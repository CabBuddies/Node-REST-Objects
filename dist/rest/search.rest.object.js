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
class SearchRESTObject {
    constructor(data) {
        this.data = data;
        this.request = {
            query: {},
            sort: {},
            attributes: [],
            pageNum: 1,
            pageSize: 5
        };
        this.response = {
            query: {},
            sort: {},
            attributes: [],
            pageNum: 1,
            pageSize: 5,
            resultSize: 0,
            resultTotalSize: 0,
            result: []
        };
    }
    setRequest(request = {}) {
        this.request.query = request.query || {};
        this.request.sort = request.sort || {};
        this.request.attributes = request.attributes || [];
        this.request.pageNum = request.pageNum || 1;
        this.request.pageSize = request.pageSize || 5;
        //console.log('setRequest',this.request);
    }
    hasNextPage() {
        if (this.request.pageNum === 0)
            return true;
        //console.log(this.request.pageSize,this.response.pageSize,this.request.pageNum,this.response.resultTotalSize);
        if (this.request.pageNum * this.request.pageSize >= this.response.resultTotalSize) {
            return false;
        }
        return true;
    }
    loadNextPage() {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('loadNextPage',this.request);
            if (this.hasNextPage() === false)
                return this;
            this.request.pageNum++;
            return yield this.search();
        });
    }
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('search',this.request);
            const result = ((yield RestOperations.postOp(this.data.overloadables.formulateSearchUrl(this.request.pageSize, this.request.pageNum), this.request)).data);
            this.response = {
                query: result.query,
                sort: result.sort,
                attributes: result.attributes,
                pageNum: result.pageNum,
                pageSize: result.pageSize,
                resultSize: result.resultSize,
                resultTotalSize: result.resultTotalSize,
                result: []
            };
            for (const r of result.result) {
                const r1 = this.data.overloadables.newInstance();
                //console.log(r1,r1.read,r1.overloadables,r1.overloadables.formulateReadUrl());
                r1.overloadables.loadPartialContent(r);
                //console.log(r["_id"],r1.data["_id"],r1.data["createdAt"]);
                this.response.result.push(r1);
                //this.response.result.forEach((item)=>console.log(item.data["_id"],item.overloadables.formulateReadUrl()));
            }
            //console.log(this.response.result);
        });
    }
}
exports.default = SearchRESTObject;
