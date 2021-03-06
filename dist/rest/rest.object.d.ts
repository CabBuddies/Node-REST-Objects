export default class RESTObject<T> {
    private api;
    data: T;
    overloadables: {
        init: () => any;
        newInstance: () => RESTObject<T>;
        loadPartialContent: (preview: object) => any;
        formulateCreateUrl: () => string;
        formulateReadUrl: (full?: boolean) => string;
        formulateSearchUrl: (pageSize: number, pageNum: number) => string;
        formulateUpdateUrl: () => string;
        formulateDeleteUrl: () => string;
        creationPacket: () => any;
        updationPacket: () => any;
    };
    constructor(api: string | Function);
    getApi(): Function;
    getData(): T;
    setData(data: T): T;
    copyJSON(target: T, source: object): T;
    create(): Promise<void>;
    read(full?: boolean): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
}
