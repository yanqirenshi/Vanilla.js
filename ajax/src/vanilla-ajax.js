class Vanilla_Ajax {
    dump (o) {
        console.log(o);
    }

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

        if (callback)
            return callback(response, this);

        // Other Error Case
        console.log('Error!' + uri);

        return {};
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

    get (path, callback) {
        var uri = this.makeUri(path);
        fetch(uri, this.makeData())
            .then(function (response) {
                if (response.ok)
                    return response.json();
                else
                    return this.errorCase(response);
            }.bind(this))
            .then(callback)
            .catch(function(error) {
                this.dump(error);
            }.bind(this));
    }

    post (path, data, callback) {
        var uri = this.makeUri(path);
        fetch(uri, this.makeData('POST', data))
            .then(function (response) {
                if(response.ok)
                    return response.json();
                else
                    return this.errorCase(response);
            })
            .then(callback);
    }

    put (path, data, callback) {
        var uri = this.makeUri(path);
        fetch(uri, this.makeData('PUT', data))
            .then(function (response) {
                if(response.ok)
                    return response.json();
                else
                    return this.errorCase(response);
            })
            .then(callback);
    }

    delete (path, callback) {
        var uri = this.makeUri(path);
        fetch(uri, this.makeData('delete'))
            .then(function (response) {
                if(response.ok)
                    return response.json();
                else
                    return this.errorCase(response);
            })
            .then(callback);
    }
}
