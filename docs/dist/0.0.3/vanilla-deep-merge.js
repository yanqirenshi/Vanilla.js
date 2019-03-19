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
        return (this._primitives.indexOf(type)==-1) ? false : true;
    }
    isOperator (v) {
        if (v===null) return true;

        let type = (typeof v);
        return (this._operator.indexOf(type)==-1) ? false : true;
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
