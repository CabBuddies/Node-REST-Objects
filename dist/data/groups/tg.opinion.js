"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TGOpinion = void 0;
const api_1 = require("../../rest/api");
const rest_object_1 = require("../../rest/rest.object");
class TGOpinion extends rest_object_1.default {
    constructor() {
        super(api_1.API.GROUPS.OPINION);
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
                groupId: '',
                postId: '',
                opinionType: '',
                createdAt: 0,
                customAttributes: {}
            });
        };
        this.overloadables.newInstance = () => {
            return new TGOpinion();
        };
        this.overloadables.creationPacket = () => {
            if (this.data.opinionType) {
                if (['follow', 'upvote', 'downvote', 'spamreport'].indexOf(this.data.opinionType) === -1)
                    this.data.opinionType = 'upvote';
            }
            return {
                body: this.data.body || '',
                groupId: this.data.groupId || '',
                postId: this.data.postId || '',
                opinionType: this.data.opinionType || 'upvote',
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.updationPacket = () => {
            const error = new Error();
            error.message = 'Option is not updatable.';
            throw error;
            return {};
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
exports.TGOpinion = TGOpinion;
