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
