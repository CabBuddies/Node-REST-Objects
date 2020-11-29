"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const api_1 = require("../../rest/api");
const rest_object_1 = require("../../rest/rest.object");
class Post extends rest_object_1.default {
    constructor() {
        super(api_1.refreshAPI().GROUPS.POST);
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
                body: '',
                groupId: '',
                active: true,
                stats: {
                    _id: '',
                    viewCount: 0,
                    postCount: 0,
                    replyCount: 0,
                    followCount: 0,
                    upvoteCount: 0,
                    downvoteCount: 0,
                    spamreportCount: 0,
                    score: 0
                },
                topics: [],
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0
            });
        };
        this.overloadables.newInstance = () => {
            return new Post();
        };
        this.overloadables.creationPacket = () => {
            return {
                title: this.data.title || '',
                body: this.data.body || '',
                groupId: this.data.groupId || '',
                topics: this.data.topics || [],
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.updationPacket = () => {
            return {
                title: this.data.title || '',
                body: this.data.body || '',
                topics: this.data.topics || [],
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
exports.Post = Post;
