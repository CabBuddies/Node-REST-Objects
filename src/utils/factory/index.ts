class Factory{
    map:{[key:string]:Function}={};
    
    bindFunction(key:string,func:Function){
        this.map[key] = func;
    }

    boundFunction(key:string){
        return this.map[key]||(()=>{console.log('no function bound on '+key)});
    }
}

export default new Factory();
