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
            data.headers['Content-Type'] = 'application/json';

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
                console.log(error);
            });
    }
    get (path, callback) {
        let uri = this.makeUri(path);
        let promis = fetch(uri, this.makeData());

        this.applyCallback2Promis(callback, promis);
    }
    post (path, data, callback) {
        let uri = this.makeUri(path);
        let promis = fetch(uri, this.makeData('POST', data));

        this.applyCallback2Promis(callback, promis);
    }
    put (path, data, callback) {
        let uri = this.makeUri(path);
        let promis = fetch(uri, this.makeData('PUT', data));

        this.applyCallback2Promis(callback, promis);
    }
    delete (path, callback) {
        let uri = this.makeUri(path);
        let promis = fetch(uri, this.makeData('delete'));

        this.applyCallback2Promis(callback, promis);
    }
}
