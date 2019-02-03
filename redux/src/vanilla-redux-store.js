class Vanilla_Redux_Store {
    constructor (reducer, contents) {
        this._reducer = reducer;
        this._contents = contents;
        this._subscribes = [];
        this._subscribers = { ht: {}, list: [] };
    }
    state () {
        return this._contents;
    }
    get (keys) {
        let keyList = keys.split(".");
        let tmp = this._contents;

        for (var i=0 ; i<keyList.length ; i++) {
            var toString = Object.prototype.toString;
            var key = keyList[i];

            if (!Immutable.Map.isMap(tmp))
                tmp = Immutable.Map(tmp);

            tmp = tmp.get(key);
        }
        return tmp;
    }
    pushMessages (action) {
        var funcs = this._subscribes;

        for (var i in funcs)
            funcs[i](action);

        for (let func of this._subscribers.list)
            func(action);
    }
    dispatch (action) {
        this._contents = this._reducer.put(this._contents, action);

        this.pushMessages(action);
    }
    subscribeAtFunction (func) {
        this._subscribes.push(func);
    }
    subscribeAtSubscriberAndFunction (subscriber, func) {
        let old_func = this._subscribers.ht[subscriber];

        if (old_func) {
            let pos = this._subscribers.list.indexOf(old_func);
            this._subscribers.list.splice(pos, 1);
        }

        this._subscribers.ht[subscriber] = func;
        this._subscribers.list.push(func);
    }
    subscribe () {
        let args_len = arguments.length;

        if (args_len >= 2)
            this.subscribeAtSubscriberAndFunction(arguments[0], arguments[1]);
        else
            this.subscribeAtFunction(arguments[0]);
    }
}
