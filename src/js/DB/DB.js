class DB {
    constructor() {
        this.data = {
            "Task": [{
                priority: '1',
                id: 166096,
                task: 'Adoption Campaign Rejected Phase',
                createdby: 'akauk@gmail.com',
                status: 'Completed'
            },{
                priority: '2',
                id: 166088,
                task: 'Analyze Feature Usage and Review with Customer',
                createdby: 'srla@gmail.com',
                status: 'Pending'
            },{
                priority: '1',
                id: 166377,
                task: 'Test task INVALID ARGUMETS 7/20/2018.',
                createdby: 'sx2@gmail.com',
                status: 'In-progress'
            }],
            "Note": [{
                priority: '11',
                id: 137746,
                note: 'Note test 11',
                createdby: 'reww@gmail.com',
                status: 'Pending'
            },{
                priority: '22',
                id: 123088,
                note: 'note test 22',
                createdby: 'yann@gmail.com',
                status: 'Pending'
            },{
                priority: '33',
                id: 198377,
                note: 'Note test 33',
                createdby: 'eekil@gmail.com',
                status: 'In-progress'
            }]
        }
    }
    get(key, callback, id) {
        var self = this
        var res = {"status":"success"};
        if (this.data[key]===undefined) {
            this.data[key] = [];
        }

        setTimeout(function() {
            if (id===undefined) {
                res.data = self.data[key];
                callback.call(self, res);
                return;
            }
            var list = self.data[key];
            var rrr;
            for (var i=0; i<list.length; i++) {
                var item =list[i];
                if (id===item.id) {
                    rrr = item;
                    break;
                }
            }
            if (rrr===undefined) {
                res.status = "failed";
            } else {
                res.data = rrr;
            }            
            callback.call(self, res);
        }, 1000)
    }

    put(key, id, data, callback) {
        var self = this;
        var res = {"status":"success"};
        if (this.data[key]===undefined) {
            this.data[key] = [];
        }
        setTimeout(function() {
            if (id===undefined) {
                res.data = self.data[key];
                callback.call(self, res);
                return;
            }
            var list = self.data[key];
            var rrr;
            for (var i=0; i<list.length; i++) {
                var item =list[i];
                if (id===item.id) {
                    rrr = list[i] = Object.assign({},item, data);
                    break;
                }
            }
            if (rrr===undefined) {
                res.status = "failed";
            } else {
                res.data = rrr;
            }            
            callback.call(self, res);
        }, 1000)
    }

    post(key, data, callback) {
        var self = this;
        var res = {"status":"success"};
        if (this.data[key]===undefined) {
            this.data[key] = [];
        }
        //autogenerate id for a new item
        var auto_new_id = Math.floor( Math.random()*20000);
        data["id"] = auto_new_id;
        this.data[key].push(data);
        setTimeout(function() {
            res.data = data;
            callback.call(self, res);
        }, 1000)
    }

    delete(key, callback, id) {
        var self = this;
        var res = {"status":"success"};
        if (this.data[key]===undefined) {
            res.status = "failed";
            callback.call(self, res);
            return;
        }

        setTimeout(function() {
            if (id===undefined) {
                res.status = "failed";
                callback.call(self, res);
                return;
            }
            var list = self.data[key];
            var rrr;
            for (var i=0; i<list.length; i++) {
                var item =list[i];
                if (id===item.id) {
                    rrr = list.splice(i,1);
                    break;
                }
            }
            if (rrr===undefined) {
                res.status = "failed";
            } else {
                res.data = rrr;
            }     
            callback.call(self, res);
        }, 1000)
    }

    
}
const db = new DB();
export default db
