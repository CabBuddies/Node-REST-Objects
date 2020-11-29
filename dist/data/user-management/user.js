"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const api_1 = require("../../rest/api");
const rest_object_1 = require("../../rest/rest.object");
class User extends rest_object_1.default {
    constructor() {
        super(api_1.refreshAPI().USER_MANAGEMENT.USER.BASE);
        this.overloadables.init = () => {
            this.setData({
                _id: '',
                userId: '',
                email: '',
                firstName: '',
                lastName: '',
                displayPicture: '',
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0
            });
        };
        this.overloadables.newInstance = () => {
            return new User();
        };
        this.overloadables.creationPacket = () => {
            const error = new Error();
            error.message = 'User is not creatable.';
            throw error;
            return {};
        };
        this.overloadables.updationPacket = () => {
            return {
                firstName: this.data.firstName || '',
                lastName: this.data.lastName || '',
                displayPicture: this.data.displayPicture || '',
                customAttributes: this.data.customAttributes || {}
            };
        };
        this.overloadables.init();
    }
    getMe() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data._id = 'me';
            yield this.read();
        });
    }
}
exports.User = User;
