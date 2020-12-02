export default class Content{
    _id:string;
    title:string;
    body:string;
    media:String[];
    tags:String[];
    lastModifiedAt;
    [prop:string]:any;
}