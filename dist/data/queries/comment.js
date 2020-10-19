"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const api_1 = require("../../rest/api");
const rest_object_1 = require("../../rest/rest.object");
class Comment extends rest_object_1.default {
    constructor() {
        super(api_1.API.QUERIES.COMMENT);
        this.overloadables.init = () => {
            this.setData({
                _id: '',
                author: {
                    _id: '',
                    userId: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    displayPicture: ''
                },
                body: '',
                queryId: '',
                responseId: '',
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0
            });
        };
        this.overloadables.newInstance = () => {
            return new Comment();
        };
        this.overloadables.creationPacket = () => {
            return {
                body: this.data.body || '',
                queryId: this.data.queryId || '',
                responseId: this.data.responseId || '',
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.updationPacket = () => {
            return {
                body: this.data.body || '',
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.init();
    }
    get_id() {
        return this.data._id;
    }
    set_id(_id) {
        this.data._id = _id;
    }
}
exports.Comment = Comment;
