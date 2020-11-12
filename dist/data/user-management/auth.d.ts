declare const register: (email: string, password: string, firstName: string, lastName: string, registrationType: string) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const login: (email: string, password: string) => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
declare const signOut: () => Promise<import("axios").AxiosResponse<any> | {
    data: {};
}>;
export { register, login, signOut };
