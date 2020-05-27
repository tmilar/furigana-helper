function isKanji(char) {
  // all kanji in the basic unicode plane
  // regex source: https://github.com/Pomax/node-jp-conversion/blob/master/index.js#L453
  const kanjiRange = /[\u3300-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
  return kanjiRange.test(char);
}

/**
 * @param aOriginal {string}
 * @param aKana {string}
 */
module.exports = function combineOriginalAndKana(aOriginal, aKana) {
  let i = 0;
  let j = 0;
  const originalLen = aOriginal.length;
  const kanaLen = aKana.length;

  const result = [];

  // while: not finished orig, not finished kana, OR next is last kana and not any result yet.
  while (
    (i < originalLen && j + 1 < kanaLen) ||
    (j + 1 === kanaLen && result.length === 0)
  ) {
    // start a new group
    let originals = "";
    let kanas = "";

    if (isKanji(aOriginal[i])) {
      originals += aOriginal[i];
      kanas += aKana[j];

      // grab next kanas until the kana matches next orig char (or no more kana left)
      while (j + 1 < kanaLen && aOriginal[i + 1] !== aKana[j + 1]) {
        kanas += aKana[j + 1];
        j++;
      }

      // grab next contiguous kanjis
      while (i + 1 < originalLen && isKanji(aOriginal[i + 1])) {
        originals += aOriginal[i + 1];
        i++;
      }

      // now next chars are both equal => we start a new group.
      i++;
      j++; // advance kanas index
    } else {
      // current chars {i,j} are equal, add original + kanas to group until the next chars differ (or no more kana left).
      originals += aOriginal[i];
      kanas += aOriginal[i];

      // grab origs + kanas, until next chars don't match (or no more next chars)
      while (j + 1 < kanaLen && !isKanji(aOriginal[i + 1])) {
        originals += aOriginal[i + 1];
        kanas += aOriginal[i + 1];

        // kanas.push(aKana[j + 1]);
        i++; // advance originals index
        j++; // advance kanas index
      }

      i++; // advance originals index
      j++; // advance kanas index
    }
    result.push([originals.trim(), kanas.trim()]);
  }

  return result;
};
