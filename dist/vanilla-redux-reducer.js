class Vanilla_Redux_Reducer {
    constructor () {}
    ht_p (v) {
        return v instanceof Object && !(v instanceof Array);
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
