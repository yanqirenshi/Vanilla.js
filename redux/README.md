# simple-redux
リダックスのオレオレ実装です。

# Usage

メモ書き程度に。

## index.html

```html
<html>
    <head>
        <script src="./src/libs/simple-redux.js"></script>
    </head>
    <body>
        <script src="./redux/Actions.js"></script>
        <script src="./redux/Reducer.js"></script>
    </body>
</html>
```


## Actions.js

```js
class Actions extends Simple_Redux_Actions {
    movePage (data) {
        return {
            type: 'MOVE-PAGE',
            data: data
        };
    }
}
```

## Reducer.js

```js
class Reducer extends Simple_Redux_Reducer {
    put (state, action) {
        switch (action.type) {

        case 'MOVE-PAGE':
            return this.merge(state, action.data);

        default:
            return state;
        }
    }
}
```

## index.js

```js
/// redux
var ACTIONS = new Actions();
var REDUCER = new Reducer();
var STORE = new Simple_Redux_Store (REDUCER, {
    contents: 'link-from'
});
```

## Action

```js
STORE.dispatch(ACTIONS.movePage({
    contents: 'link-to'
}));
```
