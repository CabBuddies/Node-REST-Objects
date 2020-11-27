"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TQOpinion = void 0;
const api_1 = require("../../rest/api");
const rest_object_1 = require("../../rest/rest.object");
class TQOpinion extends rest_object_1.default {
    constructor() {
        super(api_1.API.QUERIES.OPINION);
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
                opinionType: '',
                createdAt: 0,
                customAttributes: {}
            });
        };
        this.overloadables.newInstance = () => {
            return new TQOpinion();
        };
        this.overloadables.creationPacket = () => {
            if (this.data.opinionType) {
                if (['follow', 'upvote', 'downvote', 'spamreport'].indexOf(this.data.opinionType) === -1)
                    this.data.opinionType = 'upvote';
            }
            return {
                body: this.data.body || '',
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
exports.TQOpinion = TQOpinion;
