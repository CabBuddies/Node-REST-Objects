export default class Stats{
    _id:string;

    viewCount:number;
    postCount:number;
    replyCount:number;
    
    followCount:number;
    upVoteCount:number;
    downVoteCount:number;
    spamReportCount:number;
    score:number;
    [prop:string]:any;
}