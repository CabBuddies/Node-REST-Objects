"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const rest_object_1 = require("../../rest/rest.object");
const api_1 = require("../../rest/api");
class Group extends rest_object_1.default {
    constructor() {
        super(api_1.API.GROUPS.GROUP);
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
                title: '',
                description: '',
                displayPicture: '',
                active: true,
                stats: {
                    _id: '',
                    viewCount: 0,
                    postCount: 0,
                    replyCount: 0,
                    followCount: 0,
                    upVoteCount: 0,
                    downVoteCount: 0,
                    spamReportCount: 0,
                    score: 0
                },
                topics: {},
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0
            });
        };
        this.overloadables.newInstance = () => {
            return new Group();
        };
        this.overloadables.creationPacket = () => {
            return {
                title: this.data.title || '',
                description: this.data.description || '',
                displayPicture: this.data.displayPicture || '',
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.updationPacket = () => {
            return {
                title: this.data.title || '',
                description: this.data.description || '',
                displayPicture: this.data.displayPicture || '',
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
    setDraft(data) {
        this.data.draft.title = data.title;
        this.data.draft.body = data.body;
        this.data.draft.tags = data.tags;
    }
    setPublished(data) {
        this.data.published.title = data.title;
        this.data.published.body = data.body;
        this.data.published.tags = data.tags;
    }
    setStatus(status) {
        this.data.status = status;
    }
    getPublished() {
        return Object.assign(Object.assign({}, this.data.published), { _id: this.data._id });
    }
}
exports.Group = Group;
