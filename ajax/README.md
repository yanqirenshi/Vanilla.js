f
# vanilla-ajax
オレオレ Ajax ライブラリです。

# Usage

```js
var API = new Vanilla_Ajax({
scheme: 'http',
host: 'localhost',
port: '8080',
path: '/prefix'
credentials: 'include',
callback: {
401: function (r, api) {
location.hash = '#sign-in';
}
}
});
```


# Operetors

- get (path, callback)
- post (path, data, callback)
- put (path, data, callback)
