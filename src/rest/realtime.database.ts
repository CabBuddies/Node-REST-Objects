import firebase from 'firebase';
import 'firebase/firestore';

interface props{
    options?:any,
    url?:string,
    path?:string,
    value?:any,
    event?:'child_added'|'value',
    quickDelete?:boolean
    callback?(snapshot:firebase.database.DataSnapshot):any
}

class RealtimeDatabase{
    app:firebase.app.App;

    getApp = ({options}:props) => {
        //console.log({});
        if(options){
            this.app = !firebase.apps.length 
                        ? firebase.initializeApp(options).firestore().app
                        : firebase.app().firestore().app;
        }
        return this.app;
    }

    getDb = ({options,url}:props) => {
        //console.log({url});
        if(url)
            return this.getApp({options}).database(url);
        return this.getApp({options}).database();
    }

    getPath = ({options,url,path}:props) => {
        //console.log({url,path});
        if(path)
            return this.getDb({options,url}).ref(path);
        return this.getDb({options,url}).ref();
    }

    pushToPath = ({options,url,path,value}:props) => {
        //console.log({url,path,value});
        value = value||{};
        
        return new Promise((resolve,reject)=>{
            this.getPath({options,url,path}).push(value,(error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(true)
                }
            });
        })
    }

    observePath = ({options,url,path,event,quickDelete,callback}:props) => {
        callback = callback||((snapshot:firebase.database.DataSnapshot)=>{});
        const deleteFunction = quickDelete?
                                        (id)=>{
                                            this.getPath({options,url,path:path+'/'+id}).remove();             
                                        }:
                                        (id)=>{};
        event = event||'child_added';
        this.getPath({options,url,path}).on(event,(snapshot)=>{
            callback(snapshot);
            setTimeout(()=>{
                deleteFunction(snapshot.key);
            },10000);
        })
    }
}

export default new RealtimeDatabase();