export default class Stats {
    _id: string;
    viewCount: number;
    postCount: number;
    replyCount: number;
    memberCount: number;
    followCount: number;
    upvoteCount: number;
    downvoteCount: number;
    spamreportCount: number;
    score: number;
    [prop: string]: any;
}
