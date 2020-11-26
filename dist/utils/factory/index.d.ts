declare class Factory {
    map: {
        [key: string]: Function;
    };
    bindFunction(key: string, func: Function): void;
    boundFunction(key: string): Function;
}
declare const _default: Factory;
export default _default;
