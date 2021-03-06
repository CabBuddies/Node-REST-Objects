declare enum MessageTypes {
    NTF = "NTF",
    DCMSG = "DCMSG",
    GCMSG = "GCMSG"
}
interface IDirectChatMessage {
    type: MessageTypes;
    from: string;
    message: string;
    ts: any;
}
interface IGroupChatMessage extends IDirectChatMessage {
    roomId: string;
}
interface INotification {
    type: MessageTypes;
    eventType: string;
    message: string;
    data: any;
}
export declare function connectToFirebase(options: any): import("firebase").default.app.App;
export declare function listenLiveMessages({ ownUserId, directChatMessageReceived, groupChatMessageReceived, notificationReceived, otherMessageReceived }: {
    ownUserId: string;
    directChatMessageReceived?(directMessage: IDirectChatMessage): any;
    groupChatMessageReceived?(groupMessage: IGroupChatMessage): any;
    notificationReceived?(notification: INotification): any;
    otherMessageReceived?(message: any): any;
}): boolean;
export declare function sendDirectChatMessage(ownUserId: string, receipientUserId: string, message: string): Promise<unknown>;
export {};
