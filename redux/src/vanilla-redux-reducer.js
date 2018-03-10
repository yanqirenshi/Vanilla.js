class Vanilla_Redux_Reducer {
    constructor () {}

    ht_p (v) {
        return v instanceof Object && !(v instanceof Array);
    }

    merge_core (ht, add_ht) {
        for (var k in add_ht) {
            var v = add_ht[k];
            if (!this.ht_p(v))
                ht[k] = v;
            else
                ht[k] = this.merge_core (ht[k], add_ht[k]);
        }
        return ht;
    }

    merge (state, add_state) {
        var new_state = Object.assign({}, state);

        new_state = this.merge_core(new_state, add_state);

        return new_state;
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
