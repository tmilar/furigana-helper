// const inputOriginal = "間に合わせる";
// const inputKana = "まにあわせる";
// const expectedResult = [
//   ["間", "ま"],
//   ["に", "に"],
//   ["合", "あ"],
//   ["わせる", "わせる"],
// ];

// test1: ["わせる", "わせる", [["わせる", "わせる"]]
// test2: ["合", "あ", [["合", "あ"]]
// test3: ["合わせる", "あわせる", [["合", "あ"], ["わせる", "わせる"]]
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
  while ((i+1) < originalLen && (j+1) < kanaLen || (j + 1 === kanaLen && result.length === 0)) {
    // start a new group
    const group = [[aOriginal[i]], [aKana[j]]];

    // if current chars {i,j} are different, add kanas to pair original char until the next chars become equal.
    if (aOriginal[i] !== aKana[j]) {
      const kanas = group[1];

      // grab next kanas until the kana matches next orig char (or no more kana left)
      while (j + 1 < kanaLen && aOriginal[i + 1] !== aKana[j + 1]) {
        kanas.push(aKana[j + 1]);
        j++; // advance kanas index
      }

      // now next chars are both equal => we start a new group.
      i++;
      j++; // advance kanas index
      debugger;
    } else {
      // current chars {i,j} are equal, add original + kanas to group until the next chars differ (or no more kana left).
      const [originals, kanas] = group;

      // grab origs + kanas, until next chars don't match (or no more next chars)
      while (j + 1 < kanaLen && aOriginal[i + 1] === aKana[j + 1]) {
        originals.push(aOriginal[i + 1]);
        kanas.push(aKana[j + 1]);
        i++; // advance originals index
        j++; // advance kanas index
      }

      i++; // advance originals index
      j++; // advance kanas index
      debugger;
    }
    result.push([group[0].join(""), group[1].join("")]);

    // if (j + 1 === kanaLen) {
    //   break;
    // }
  }

  return result;
};

const testCases = [
  ["わせる", "わせる", [["わせる", "わせる"]]],
  ["合", "あ", [["合", "あ"]]],
  [
    "合わせる",
    "あわせる",
    [
      ["合", "あ"],
      ["わせる", "わせる"],
    ],
  ],
];
