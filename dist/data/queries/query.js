"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const rest_object_1 = require("../../rest/rest.object");
const api_1 = require("../../rest/api");
class Query extends rest_object_1.default {
    constructor() {
        super(api_1.API.QUERIES.QUERY);
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
                createdAt: 0,
                customAttributes: {},
                draft: {
                    _id: '',
                    title: '',
                    body: '',
                    tags: [],
                    lastModifiedAt: 0
                },
                published: {
                    _id: '',
                    title: '',
                    body: '',
                    tags: [],
                    lastModifiedAt: 0
                },
                stats: {
                    _id: '',
                    downVoteCount: 0,
                    followCount: 0,
                    responseCount: 0,
                    score: 0,
                    spamReportCount: 0,
                    upVoteCount: 0,
                    viewCount: 0
                },
                status: 'draft',
                access: {
                    type: 'public',
                    users: []
                }
            });
        };
        this.overloadables.newInstance = () => {
            return new Query();
        };
        this.overloadables.creationPacket = () => {
            if (this.data.status) {
                if (['draft', 'published'].indexOf(this.data.status) === -1)
                    this.data.status = 'draft';
            }
            return {
                published: {
                    title: this.data.published.title || '',
                    body: this.data.published.body || '',
                    tags: this.data.published.tags || []
                },
                draft: {
                    title: this.data.draft.title || '',
                    body: this.data.draft.body || '',
                    tags: this.data.draft.tags || []
                },
                status: this.data.status || 'draft',
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.updationPacket = () => {
            if (this.data.status) {
                if (['draft', 'published'].indexOf(this.data.status) === -1)
                    this.data.status = 'draft';
            }
            return {
                published: {
                    title: this.data.published.title || '',
                    body: this.data.published.body || '',
                    tags: this.data.published.tags || []
                },
                draft: {
                    title: this.data.draft.title || '',
                    body: this.data.draft.body || '',
                    tags: this.data.draft.tags || []
                },
                status: this.data.status || 'draft',
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
exports.Query = Query;
