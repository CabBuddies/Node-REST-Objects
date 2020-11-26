import * as Publisher from "./publisher";
import Subscriber from "./subscriber";
import Topic from './topic';
declare class Organizer {
    subscribers: {
        [key: string]: Subscriber[];
    };
    constructor();
    subscribe(topic: string, subscriber: Subscriber): void;
    publishMessage(topic: string, message: any): Promise<unknown>;
}
declare const PubSub: Organizer;
export { PubSub, Publisher, Topic };
export type { Subscriber };
