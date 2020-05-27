Lib to support Kanji-only furigana string extractions.
Created as a collaboration for [Furigana Chrome Extension](https://chrome.google.com/webstore/detail/furigana/ingbigompaecaefaoihaicmkgepkmkeg).

# Usage
Install lib:
```
npm install @tmilar/furigana-helper
```
Then, import it
```js
const { combineOriginalAndKana } = require("@tmilar/furigana-helper")

const combined = combineOriginalAndKana("送り仮名", "おくりがな")
// =>  [
//       ["送", "おく"],
//       ["り", "り"],
//       ["仮名", "がな"],
//     ]
```

# API

### combineOriginalAndKana(original, kana)
Given an input of an arbitrary japanese string, and the corresponding -kana string, return an array of the combinations of original kanji + kana, and the original kana kept unmodified.

For example:
```js
const original = "送り仮名"
const kana = "おくりがな"

combineOriginalAndKana(original, kana)
// =>  [
//       ["送", "おく"],
//       ["り", "り"],
//       ["仮名", "がな"],
//     ]
```

Katakana input is not modified: 
```js
const original = "ケーソン工法"
const kana = "けえそん こうほう"

combineOriginalAndKana(original, kana)
// =>  [
//       ["ケーソン", "ケーソン"],
//       ["工法", "こうほう"],
//     ]
``` 

## Test
Clone & install locally: 
```
git clone git@github.com:tmilar/furigana-helper.git && cd furigana-helper
npm install
```
Run tests:
```
npm test
```

# License

MIT
