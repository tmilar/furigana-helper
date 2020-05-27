const { expect } = require("chai");
const debug = require("debug");
const { combineOriginalAndKana } = require("./combineOriginalAndKana");

const log = debug("test:lib:combineOriginalAndKana");

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
  [
    "アカデミー賞",
    "あかでみいしょう",
    [
      ["アカデミー", "アカデミー"],
      ["賞", "しょう"],
    ],
  ],
  [
    "ケーソン工法",
    "けえそん こうほう",
    [
      ["ケーソン", "ケーソン"],
      ["工法", "こうほう"],
    ],
  ],
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
  ["グレード", "ぐれえど", [["グレード", "グレード"]]],
];

const failingCases = [
  // fails because katakana is not converted to "original" kana, it's being treated as-is instead.
  [
    "アカデミー賞",
    "あかでみいしょう",
    [
      ["アカデミー", "いあかでみ"],
      ["賞", "しょう"],
    ],
  ],
  // fails because ascii/emojis not implemented
  ["(^w^)", ":)", [["(^w^)", ":)"]]],
  // literal numbers are difficult to distinguish as composite words or just numbers, so this will fail.
  // It will work if number appears as literal kanji though, ie. "五日間" instead of "5日間"
  ["5日間", "いつか かん", [["5日間", "いつか かん"]]],
];

describe("combineOriginalAndKana()", () => {
  describe("combines as expected", () => {
    testCases.forEach(([inputOriginal, inputKana, expectedResult]) => {
      expectKanaExtract(inputOriginal, inputKana, expectedResult);
    });
  });

  describe("not working as expected (unsupported cases)", () => {
    failingCases.forEach(([inputOriginal, inputKana, expectedResult]) => {
      expectKanaExtractFail(inputOriginal, inputKana, expectedResult);
    });
  });

  /**
   * Helper method to dynamically assert test cases work as expected
   *
   * @param inputOriginal {string}
   * @param inputKana {string}
   * @param expectedResult {[string]}
   */
  function expectKanaExtract(inputOriginal, inputKana, expectedResult) {
    const result = combineOriginalAndKana(inputOriginal, inputKana);

    it(`input original: ${inputOriginal} kana: ${inputKana} -> extracts ${expectedResult.length} group(s)`, () => {
      log(`${inputOriginal}, ${inputKana} -> combined result: `, result);
      expect(result).to.eql(expectedResult);
    });
  }

  /**
   * Helper method to assert that some test combinations don't work as expected.
   * @param inputOriginal {string}
   * @param inputKana {string}
   * @param expectedResult {[string]}
   */
  function expectKanaExtractFail(inputOriginal, inputKana, expectedResult) {
    const result = combineOriginalAndKana(inputOriginal, inputKana);

    it(`input original: ${inputOriginal} kana: ${inputKana} -> unexpected extraction`, () => {
      log(`${inputOriginal}, ${inputKana} -> combined result: `, result);
      expect(result).to.not.eql(expectedResult);
    });
  }
});
