import { API } from '../../rest/api';
import RESTObject from '../../rest/rest.object';

interface IUser{
    _id:string;
    userId:string;
    email:string;
    firstName:string;
    lastName:string;
    displayPicture:string;
    [props:string]:any;
}

class User extends RESTObject<IUser>{

    constructor(){
        super(API.USER_MANAGEMENT.USER);
        this.overloadables.init = () => {
            this.setData({
                _id:'',
                userId:'',
                email:'',
                firstName:'',
                lastName:'',
                displayPicture:'',
                customAttributes:{},
                createdAt:0,
                lastModifiedAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new User();
        }

        this.overloadables.creationPacket = () => {
            const error = new Error();
            error.message = 'User is not creatable.';
            throw error;
            return {}
        }
    
        this.overloadables.updationPacket = () => {
            return {
                firstName:this.data.firstName||'',
                lastName:this.data.lastName||'',
                displayPicture:this.data.displayPicture||'',
                customAttributes:this.data.customAttributes||{}
            }
        }

        this.overloadables.init();
    }

    async getMe(){
        this.data._id = 'me';
        await this.read();
    }

}

export {
    IUser,
    User
}