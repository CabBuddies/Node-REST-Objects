"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const rest_object_1 = require("../../rest/rest.object");
const api_1 = require("../../rest/api");
;
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
                    upvoteCount: 0,
                    downvoteCount: 0,
                    spamreportCount: 0,
                    score: 0
                },
                topics: [],
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0,
                access: {
                    view: 'public',
                    post: 'member'
                },
                preferences: {
                    automaticMembership: false
                },
                plan: {
                    origin: {
                        time: {
                            _id: '',
                            timestamp: 0,
                            isFlexible: false,
                            flexibility: {
                                early: 0,
                                late: 0
                            }
                        },
                        place: {
                            _id: '',
                            gps: {
                                lat: 0,
                                lng: 0
                            },
                            isFlexible: false,
                            address: {
                                raw: '',
                                addressLine1: '',
                                addressLine2: '',
                                city: '',
                                country: '',
                                state: '',
                                zip: ''
                            },
                            flexibility: {
                                miles: 0
                            }
                        }
                    },
                    destination: {
                        time: {
                            _id: '',
                            timestamp: 0,
                            isFlexible: false,
                            flexibility: {
                                early: 0,
                                late: 0
                            }
                        },
                        place: {
                            _id: '',
                            gps: {
                                lat: 0,
                                lng: 0
                            },
                            isFlexible: false,
                            address: {
                                raw: '',
                                addressLine1: '',
                                addressLine2: '',
                                city: '',
                                country: '',
                                state: '',
                                zip: ''
                            },
                            flexibility: {
                                miles: 0
                            }
                        }
                    }
                }
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
                plan: this.data.plan || {},
                access: this.data.access || {},
                preferences: this.data.preferences || {},
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.updationPacket = () => {
            return {
                title: this.data.title || '',
                description: this.data.description || '',
                displayPicture: this.data.displayPicture || '',
                plan: this.data.plan || {},
                access: this.data.access || {},
                preferences: this.data.preferences || {},
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
exports.Group = Group;
