class AppStore extends Store{
    constructor (reducer, contents) {
        super(reducer, contents);
    }
}

class AppActions extends Actions{
    testSimple (data) {
        return {
            type: 'TEST-SIMPLE',
            data: data
        };
    }
}

class AppReducer extends Reducer{
    put (state, action) {
        switch (action.type) {

        case 'TEST-SIMPLE':
            return this.merge(state, {
                test: {
                    simple: action.data
                }
            });

        default:
            return state;
        }
    }
}
