import * as RestOperations from './rest.operations';
import SearchRESTObject from './search.rest.object';

export default class RESTObject<T>{

    api:string;

    data:T;

    overloadables = {
        init: ():any => {
            this.data = <T> {};
        },
        newInstance: ():RESTObject<T> => {
            return null;
        },
        loadPartialContent: (preview:object):any => {
            //console.log('loadPartialContent',preview);
            this.setData(this.copyJSON(this.getData(),preview));
        },
        formulateReadUrl: ():string => {
            return this.api+'/'+this.data["_id"];
        },
        formulateSearchUrl: (pageSum:number,pageNum:number):string => {
            return this.api+"?pageSum="+pageSum+"&pageNum="+pageNum;
        },
        formulateUpdateUrl: ():string => {
            return this.api+'/'+this.data["_id"];
        },
        formulateDeleteUrl: ():string => {
            return this.api+'/'+this.data["_id"];
        },
        creationPacket: ():any => {
            return this.data;
        },
        updationPacket: ():any => {
            return this.data;
        }
    };

    //searchRestObject:SearchRESTObject<T>;

    constructor(api:string){
        this.api = api;
        //this.searchRestObject = new SearchRESTObject(this);
        this.overloadables.init();
    }

    getApi(){
        return this.api;
    }

    getData(){
        return this.data;
    }

    setApi(api:string){
        this.api = api;
        return this.getApi();
    }

    setData(data:T){
        this.data = data;
        return this.getData();
    }

    copyJSON(target:T,source:object){
        //console.log(target,source);
        for(const k of Object.keys(source)){
            target[k] = (source[k].constructor.name === 'Object') ? this.copyJSON(target[k]||{},source[k]) : source[k];
        }
        return target;
    }

    

    async create(){
        console.log('POST',this.api,this.overloadables.creationPacket());
        // this.data = <T> ((await RestOperations.postOp(this.api,this.overloadables.creationPacket())).data);
        this.overloadables.loadPartialContent((await RestOperations.postOp(this.api,this.overloadables.creationPacket())).data);
    }

    async read(){
        console.log('GET',this.api,this.data["_id"]);
        this.overloadables.loadPartialContent((await RestOperations.getOp(this.overloadables.formulateReadUrl())).data);
    }

    async update(){
        console.log('PUT',this.api,this.overloadables.updationPacket());
        this.overloadables.loadPartialContent((await RestOperations.putOp(this.overloadables.formulateUpdateUrl(),this.overloadables.updationPacket())).data);
    }

    async delete(){
        console.log('DELETE',this.api,this.data["_id"]);
        this.overloadables.loadPartialContent((await RestOperations.deleteOp(this.overloadables.formulateDeleteUrl())).data);
    }

    // async search(data:{query?:object,sort?:object,pageSize?:number,pageNum?:number,attributes?:object} = {}){
    //     return await this.searchRestObject.search(data);
    // }
}