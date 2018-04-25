# Vanilla Metronome

シンプルな繰替えしタイマーなクラスです。

## Usage

```js
let Metronome = new Vanilla_metronome({
interval: 1000,
tick: function (count) {
console.log((count % 2)==1 ? 'Tick!' : 'Tack!')
}
});
Metronome.start();
Metronome.stop();
```
