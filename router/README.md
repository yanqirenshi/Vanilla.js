# Router

## Spec

MEMO:

- hash をパースする。
- パースした hash でパスを検索する。
- パスのルート・ページに遷移する。
- パスのルート・ページは、それ以降のページを描画する。

パスが存在しない場合

- 404 ページを表示し、存在しうるまで親を遡り、そのページへのリダイレクト・リンクを貼る。
- ルートも無い場合はリダイレクト・リンクは貼らずそのまま。
- /errors/not/found/page にするか。

### 課題

- 「パスのルート・ページをベースにする」か「指定されたパスのタグで全入れ替え」の二通りがある。(解決)
   - 「パスのルート・ページをベースにする」 を採用している。
   - ヘッダ/フッタとか流用したいし。
   - 「指定されたパスのタグで全入れ替え」は、パスのルート・ページのタグ内でコントロールできるし。

## Usage

MEMO: example now

```
    routing (hash) {
        let store = this._store;
        let actions = this._actions;

        let site = store.state().get('site');

        let len = hash.length;
        let page_code = hash[0] ? hash[0] : site.home_page;

        site.active_page = page_code;

        let page = site.pages.find((d) => { return d.code == page_code; });

        page.active_section = hash.length==2 ? hash[1] : page.home_section;

        store.dispatch(actions.movePage({
            site: site
        }));
    }
```


## Dependencies

- riot router
