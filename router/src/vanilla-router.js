class Vanilla_Router {
    constructor () {
        let pages = {
            active: null,
            page01: {
                regex: '',
                tag: null,
                children: {
                    child01: {
                        regex: '',
                        tag: null,
                        sections: {
                            grandson01: {
                                regex: '',
                                tag: null,
                                children: []
                            }
                        }
                    }
                }
            }
        };
    }
}
