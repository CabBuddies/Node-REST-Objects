declare let handlers: {
    handleEmptyToken: () => void;
    handleExpiredRefreshToken: () => void;
    handleNetworkError: () => void;
};
export declare function setHandlers(value: typeof handlers): void;
export default function (promise: Promise<any>): Promise<unknown>;
export {};
