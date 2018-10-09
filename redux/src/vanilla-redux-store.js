class Vanilla_Redux_Store {
    constructor (reducer, contents) {
        this._reducer = reducer;
        this._contents = contents;
        this._subscribes = [];
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

    dispatch (action) {
        this._contents = this._reducer.put(this._contents, action);

        var funcs = this._subscribes;
        for (var i in funcs)
            funcs[i](action);
    }

    subscribe (func) {
        this._subscribes.push(func);
    }
}
