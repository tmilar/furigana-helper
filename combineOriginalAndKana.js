/**
 * Combine any JP string input with it's corresponding -kana transcription, to groups of original-kana pairs
 * useful for kanji-only furigana readability.
 *
 * @param aOriginal {string} - original JP string comprised of kanji / hiragana / katakana symbols
 * @param aKana {string} - corresponding JP string in hiragana / katakana symbols only
 * @return combinedGroups [] - array of string pairs of original-to-kana combinations.
 */
function combineOriginalAndKana(aOriginal, aKana) {
  let i = 0;
  let j = 0;
  const originalLen = aOriginal.length;
  const kanaLen = aKana.length;

  const combinedGroups = [];

  // while: not finished orig AND next kanas available, OR next kana is tbe last one and not any result yet.
  while (
    (i < originalLen && j + 1 < kanaLen) ||
    (j + 1 === kanaLen && combinedGroups.length === 0)
  ) {
    // start a new group
    let originals = "";
    let kanas = "";

    if (_isKanji(aOriginal[i])) {
      originals += aOriginal[i];
      kanas += aKana[j];

      // grab next kanas, until the next kana matches the next orig char (or no more kana left)
      while (j + 1 < kanaLen && aOriginal[i + 1] !== aKana[j + 1]) {
        kanas += aKana[j + 1];
        j++;
      }

      // grab next contiguous kanjis
      while (i + 1 < originalLen && _isKanji(aOriginal[i + 1])) {
        originals += aOriginal[i + 1];
        i++;
      }

      // now, next chars are not kanji, and both equal => advance indexes and start a new group.
      i++;
      j++;
    } else {
      // current orig is not kanji
      // grab origs & kanas, until a kanji appears (or no more next chars)
      while (j < kanaLen && !_isKanji(aOriginal[i])) {
        originals += aOriginal[i];
        kanas += aOriginal[i];

        i++; // advance originals index
        j++; // advance kanas index
      }
    }

    combinedGroups.push([originals.trim(), kanas.trim()]);
  }

  return combinedGroups;
}

/**
 * Util method to detect if string is kanji only
 *
 * @param char {string}
 * @return {boolean}
 * @private
 */
function _isKanji(char) {
  // all kanji in the basic unicode plane
  // regex source: https://github.com/Pomax/node-jp-conversion/blob/master/index.js#L453
  const kanjiRange = /[\u3300-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
  return kanjiRange.test(char);
}

module.exports = {
  combineOriginalAndKana,
};
