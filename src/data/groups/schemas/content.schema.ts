export default class Content{
    _id:string;
    title:string;
    body:string;
    tags:String[];
    lastModifiedAt;
    [prop:string]:any;
}