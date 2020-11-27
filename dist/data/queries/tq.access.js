"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TQAccess = void 0;
const api_1 = require("../../rest/api");
const rest_object_1 = require("../../rest/rest.object");
class TQAccess extends rest_object_1.default {
    constructor() {
        super(api_1.API.QUERIES.ACCESS);
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
                queryId: '',
                userId: {
                    _id: '',
                    userId: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    displayPicture: ''
                },
                status: 'requested',
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0
            });
        };
        this.overloadables.newInstance = () => {
            return new TQAccess();
        };
        this.overloadables.creationPacket = () => {
            return {
                userId: this.data.userId || '',
                status: this.data.status || 'requested'
            };
        };
        this.overloadables.updationPacket = () => {
            return {
                userId: this.data.userId || '',
                status: this.data.status || 'requested'
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
exports.TQAccess = TQAccess;
