const { expect } = require("chai");
const combineOriginalAndKana = require("./combineOriginalAndKana");

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
  [
    "間に合わせる",
    "まにあわせる",
    [
      ["間", "ま"],
      ["に", "に"],
      ["合", "あ"],
      ["わせる", "わせる"],
    ],
  ],
  ["アカデミー賞", "あかでみいしょう", [["アカデミー", "アカデミー"], ["賞", "しょう"]] ],
  ["ケーソン工法", "けえそん こうほう", [["ケーソン","ケーソン"], ["工法","こうほう"]]],
  [
    "送り仮名",
    "おくりがな",
    [
      ["送", "おく"],
      ["り", "り"],
      ["仮名", "がな"],
    ],
  ],
  ["五日間", "いつか かん", [["五日間", "いつか かん"]]],
  ["グレード", "ぐれえど", [["グレード", "グレード"]] ],
];


function expectKanaExtract(inputOriginal, inputKana, expectedResult) {
  const result = combineOriginalAndKana(inputOriginal, inputKana);

  it(`input original: ${inputOriginal} kana: ${inputKana} -> extracts ${expectedResult.length} group(s)`, () => {
    console.log(`${inputOriginal}, ${inputKana} -> combined result: `, result);
    expect(result).to.eql(expectedResult);
  });
}

describe("combineOriginalAndKana", () => {
  testCases.forEach(([inputOriginal, inputKana, expectedResult]) => {
    expectKanaExtract(inputOriginal, inputKana, expectedResult);
  });
});
