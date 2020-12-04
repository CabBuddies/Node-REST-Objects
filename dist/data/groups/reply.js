"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const api_1 = require("../../rest/api");
const rest_object_1 = require("../../rest/rest.object");
class Reply extends rest_object_1.default {
    constructor() {
        super(api_1.refreshAPI().GROUPS.REPLY);
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
                postId: '',
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0
            });
        };
        this.overloadables.newInstance = () => {
            return new Reply();
        };
        this.overloadables.creationPacket = () => {
            return {
                body: this.data.body || '',
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
exports.Reply = Reply;
