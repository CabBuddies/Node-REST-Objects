export default class Stats {
    _id: string;
    viewCount: number;
    responseCount: number;
    followCount: number;
    upVoteCount: number;
    downVoteCount: number;
    spamReportCount: number;
    score: number;
    [prop: string]: any;
}
