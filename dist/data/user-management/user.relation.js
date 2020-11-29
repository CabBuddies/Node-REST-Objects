"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRelation = void 0;
const rest_object_1 = require("../../rest/rest.object");
const api_1 = require("../../rest/api");
class UserRelation extends rest_object_1.default {
    constructor() {
        super(api_1.refreshAPI().USER_MANAGEMENT.USER.RELATION);
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
                lastModifiedAt: 0,
                customAttributes: {},
                status: 'requested',
                followeeId: {
                    _id: '',
                    userId: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    displayPicture: ''
                },
                followerId: {
                    _id: '',
                    userId: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    displayPicture: ''
                }
            });
        };
        this.overloadables.newInstance = () => {
            return new UserRelation();
        };
        this.overloadables.creationPacket = () => {
            if (!this.data.status) {
                this.data.status = 'requested';
            }
            if (["requested", "blocked"].indexOf(this.data.status) === -1)
                this.data.status = 'requested';
            return {
                status: this.data.status || 'requested'
            };
        };
        this.overloadables.updationPacket = () => {
            if (!this.data.status) {
                this.data.status = 'accepted';
            }
            if (["accepted", "rejected"].indexOf(this.data.status) === -1)
                this.data.status = 'accepted';
            return {
                status: this.data.status || 'accepted'
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
    setFolloweeId(userId) {
        this.data.followeeId.userId = userId;
    }
    setFollowerId(userId) {
        this.data.followerId.userId = userId;
    }
}
exports.UserRelation = UserRelation;
