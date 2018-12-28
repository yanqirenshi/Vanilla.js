function dump (o) {
    if (arguments.length <= 1) {
        console.log(o);
        return;
    }

    console.log(Array.apply(null, arguments));
}
class Vanilla_Ajax {
    /*
     * {
     *    scheme: 'localhost',
     *    port: '55555',
     *    cors: true,
     *    credentials: true,
     *    path: {
     *       prefix: '/pre'
     *    },
     * }
     */
    constructor(params) {
        this.protcol = params.scheme;
        this.host = params.host;
        this.port = params.port;
        this.cors = params.cors ? params.cors : false;
        this.credentials = params.credentials ? params.credentials : null;
        this.path = params.path ? params.path : {
            path: { prefix: '' }
        };
        this.callback = params.callback ? params.callback : {};
    }
    makeUri (path) {
        var port = '';
        if (this.port)
            port = ':' + this.port;

        return this.protcol + '://'
            + this.host
            + port
            + this.path.prefix
            + path;
    }
    error401 () {
        location.href = '/sign-in.html';
        return {};
    }
    errorCase (response) {
        let status = response.status;
        let callback = this.callback[status];
        let callback_other = this.callback.other;

        if (callback)
            callback(response, this);
        else if (callback_other)
            callback_other(response, this);

        return response.json();
    }
    makeData (method, body) {
        var data =  {
            method: method ? method : 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        };

        if (method=='POST') {
            data.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            if (body)
                data.body = JSON.stringify(body);
        }

        if (this.cors)
            data.mode = 'cors';

        if (this.credentials)
            data.credentials = this.credentials;

        return data;
    }
    jsonCallback (callback, json, response) {
        let status = response.status;
        let success  = response.ok;

        if (callback)
            callback(json, success, status, response);
    }
    applyCallback2Promis (callback, promis) {
        let response_tmp = null;

        promis
            .then((response) => {
                response_tmp = response;

                if (response.redirected) {
                    location.href = response.url;
                    return null;
                }

                return response.ok ? response.json() : this.errorCase(response);
            })
            .then((json) => {
                this.jsonCallback(callback, json, response_tmp);
            })
            .catch((error) => {
                dump(error);
            });
    }
    get (path, callback) {
        let uri = this.makeUri(path);
        let promis = fetch(uri, this.makeData());

        this.applyCallback2Promis(callback, promis);
    }
    post (path, data, callback) {
        let uri = this.makeUri(path);
        let promis = this.makeData('POST', data);

        this.applyCallback2Promis(callback, fetch(uri, promis));
    }
    put (path, data, callback) {
        let uri = this.makeUri(path);
        let promis = this.makeData('PUT', data);

        this.applyCallback2Promis(callback, fetch(uri, promis));
    }
    delete (path, callback) {
        let uri = this.makeUri(path);
        let promis = fetch(uri, this.makeData('delete'));

        this.applyCallback2Promis(callback, fetch(uri, promis));
    }
}
class Vanilla_Redux_Actions {
    constructor () {}
    sampleAction (data) {
        return {
            type: 'SAMPLE-ACTION',
            data: data
        };
    }
}
class Vanilla_Redux_Reducer {
    constructor () {}
    ht_p (v) {
        return v instanceof Object && !(v instanceof Array);
    }
    merge (state, add_state) {
        return state.mergeDeep(add_state);
    }
    put (state, action) {
        switch (action.type) {

        case 'SAMPLE-ACTION':
            return this.merge(state, {
                'sample': {
                    action: state.data
                }
            });

        default:
            return state;
        }
    }
}
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
class Vanilla_URI {
    parseUrlHash_list2ht (nodes) {
        let out = {
            page: null,
            type: null,
            symbol: null
        };

        let len = nodes .length;

        out.page = len==0 ? '/' : nodes[0];

        if (out.page=='symbols') {
            if (len>=2)
                out.type = nodes[1];
            if (len>=3)
                out.symbol = nodes[2];
            return out;
        }

        return out;
    }
    parseUrlHash (hash) {
        let ret = hash.match(/#(.*)/) || hash.match(/^#(.*)$/);
        let nodes = ret ? ret[1].split('/') : [];

        return this.parseUrlHash_list2ht(ret[1].split('/'));
    }
}
class Vanilla_metronome {
    /*
     * {
     *   interval: 1000
     *   tick: function () {}
     * }
     */
    constructor(params) {
        this._timer = null;
        this._count = 0;

        this.interval = params.interval;
        this.tick = params.tick;
    }
    tick () {
        this._count += 1;

        if (this._count==88888887)
            this._count = 1;

        this.tick(this._count);
    }
    start () {
        if (this._timer) this.stop();

        this.tick();

        let interval = this.interval ? this.interval : 1000;

        this._timer = setInterval(() => { this.tick();}, interval);
    }
    stop () {
        if (this._timer)
            clearInterval(this._timer);

        this._count = 0;
        this._timer = null;
    }
}
class Vanilla_DeepMerge {
    constructor () {
        this._primitives = [
            "undefined",
            "boolean",
            "number",
            "string"
        ];
        this._operator = [
            "function",
            "symbol"
        ];
    }
    isPrimitive (v) {
        if (v===null) return true;

        let type = (typeof v);
        return this._primitives.find((d) => { return d==type; }) ? true : false;
    }
    isOperator (v) {
        if (v===null) return true;

        let type = (typeof v);

        return this._operator.find((d) => { return d==type; }) ? true : false;
    }
    isArray (v) {
        return (v instanceof Object && v instanceof Array) ? true : false;
    }
    isHash (v) {
        return (v instanceof Object && !(v instanceof Array)) ? true : false;
    }
    copyVal (val) {
        let toString = Object.prototype.toString;

        if (this.isPrimitive(val) || this.isOperator(val)) {
            return val;
        }

        if ((typeof val)=='object') {
            let type_str = toString.call(val);
            let type = type_str.substring(8, type_str.length-1);

            if (type=='Array')
                return this.copyArray(val);

            if (type=='Object')
                return this.copyHash(val);

            return val;
        }

        throw new Error('なんじゃこりゃ!! ' +
                        'val=' + val +
                        ', typeof=' + (typeof v) +
                        ', type=' + toString);
    }
    copyArray (arr) {
        let out = [];

        for (var i in arr) {
            out.push(this.copyVal(arr[i]));
        }

        return out;
    }
    copyHash (hash) {
        var toString = Object.prototype.toString;

        let out = {};

        for (var key in hash) {
            let val = hash[key];
            out[key] = this.copyVal(val);
        }

        return out;
    }
    copy (source) {
        return this.copyVal(source);
    }
}
