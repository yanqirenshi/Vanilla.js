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
        return this._primitives.find(type) ? true : false;
    }
    isOperator (v) {
        if (v===null) return true;

        let type = (typeof v);
        return this._operator.find(type) ? true : false;
    }
    isArray (v) {
        return (v instanceof Object && v instanceof Array) ? true : false;
    }
    isHash (v) {
        return (v instanceof Object && !(v instanceof Array)) ? true : false;
    }
    copy (source) {
        let target = {};

        for (var key in source) {
            let val = source[key];

            if (this.isPrimitive(val) || this.isOperator(val)) {
                continue;
            } else if (this.isArray(v)) {
            } else if (this.Hash(v)) {
            }
        }

        return target;
    }
}
