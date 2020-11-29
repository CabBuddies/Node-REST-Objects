declare const register: (email: string, password: string, firstName: string, lastName: string, registrationType: 'inapp' | 'google', displayPicture?: string) => Promise<unknown>;
declare const login: (email: string, password: string) => Promise<unknown>;
declare const getMe: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const getAccessToken: () => Promise<unknown>;
declare const sendConfirmationToken: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const confirmToken: (token: string) => Promise<unknown>;
declare const signOut: () => Promise<unknown>;
declare const signOutAll: () => Promise<unknown>;
export { register, login, getMe, getAccessToken, sendConfirmationToken, confirmToken, signOut, signOutAll };
