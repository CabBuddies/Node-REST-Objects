declare const register: (email: string, password: string, firstName: string, lastName: string, registrationType: string, displayPicture?: string) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const login: (email: string, password: string) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const getMe: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const getAccessToken: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const sendConfirmationToken: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const confirmToken: (token: string) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const signOut: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const signOutAll: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
export { register, login, getMe, getAccessToken, sendConfirmationToken, confirmToken, signOut, signOutAll };
