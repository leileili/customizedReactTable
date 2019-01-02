import db from '../DB/DB';

class RemoteService {

    put( key , id , data, callback) {
        db.put(key, id, data, callback);
    }

    get(key, callback, id, dispatch) { 
        db.get(key , function(res) {
            dispatch({"type":key, "data":res.data})
            if (callback!==undefined){
                callback()
            }
           
        }, id)
        
    }

    post(key, data, callback) {
        db.post(key, data, callback);
    }

    delete( key, callback, id) {
        db.delete(key, callback, id);
    }
}

const remoteService = new RemoteService();
export default remoteService
