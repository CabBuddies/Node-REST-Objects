interface IDirectChatMessage {
    from: string;
    message: string;
    ts: any;
}
interface IGroupChatMessage extends IDirectChatMessage {
    roomId: string;
}
interface INotification {
    eventType: string;
    message: string;
    data: any;
}
export declare function connectToFirebase(options: any): import("firebase").default.app.App;
export declare function listenLiveMessages({ directChatMessageReceived, groupChatMessageReceived, notificationReceived, otherMessageReceived }: {
    directChatMessageReceived?(directMessage: IDirectChatMessage): any;
    groupChatMessageReceived?(groupMessage: IGroupChatMessage): any;
    notificationReceived?(notification: INotification): any;
    otherMessageReceived?(message: any): any;
}): boolean;
export declare function sendDirectChatMessage(receipientUserId: string, message: string): Promise<unknown>;
export {};
