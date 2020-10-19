declare const postOp: (url: string, data: any) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const getOp: (url: string, data?: object) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const putOp: (url: string, data: any) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const deleteOp: (url: string) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
export { postOp, getOp, putOp, deleteOp };
