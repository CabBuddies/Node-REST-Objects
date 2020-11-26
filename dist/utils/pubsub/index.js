"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = exports.Publisher = exports.PubSub = void 0;
const Publisher = require("./publisher");
exports.Publisher = Publisher;
const topic_1 = require("./topic");
exports.Topic = topic_1.default;
class Organizer {
    constructor() {
        this.subscribers = {};
    }
    subscribe(topic, subscriber) {
        if (!this.subscribers[topic]) {
            this.subscribers[topic] = [];
        }
        this.subscribers[topic].push(subscriber);
    }
    publishMessage(topic, message) {
        console.log('PubSub', 'publishMessage', 'topic', topic, 'message', message);
        return new Promise((resolve, reject) => {
            try {
                if (this.subscribers[topic]) {
                    this.subscribers[topic].forEach((subscriber) => {
                        subscriber.processMessage(topic, message);
                    });
                }
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
const PubSub = new Organizer();
exports.PubSub = PubSub;
