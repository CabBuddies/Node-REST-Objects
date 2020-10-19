import {assert,expect,should} from 'chai';
import { Group } from '../../data/groups';

import {Auth} from '../../data/user-management';

console.log(describe,it)

describe('Group',()=>{
    describe('Create',()=>{
        it('HappyCase', async function () {
            await Auth.login('nihal+test1@cabbuddies.com','strong');

            let group:Group = new Group();

            group.data.title = 'Sample Title 1';
            group.data.description = 'Sample Description 1';

            group.data.displayPicture = 'highresimg.png';

            await group.create();

            console.log(group.data);

            expect(group.data._id.length>0,'Group Id is an empty string');
            
        });
    })
})