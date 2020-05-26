const { expect } = require("chai");
const combineOriginalAndKana = require("./combineOriginalAndKana");

const testCases = [
  ["わせる", "わせる", [["わせる", "わせる"]]],
  ["合", "あ", [["合", "あ"]]],
  ["合わせる", "あわせる", [["合", "あ"], ["わせる", "わせる"]]],
  ["間に合わせる", "まにあわせる", [
    ["間", "ま"],
    ["に", "に"],
    ["合", "あ"],
    ["わせる", "わせる"],
  ]]
]

function expectKanaExtract(inputOriginal, inputKana, expectedResult) {

  const result = combineOriginalAndKana(inputOriginal, inputKana);

  it(`original ${inputOriginal} -> kana ${inputKana} extracts ${expectedResult.length} groups`, () => {
    console.log(testCaseName)
    console.log(`${inputOriginal} -> ${inputKana} -> combined result: `, result)
    expect(result).to.eql(expectedResult);
  })
}

describe("combineOriginalAndKana", () => {

  testCases.forEach(([inputOriginal, inputKana, expectedResult]) => {
    expectKanaExtract(inputOriginal, inputKana, expectedResult)
  })

  it("should extract kana 2", () => {
    const inputOriginal = "間に合わせる";
    const inputKana = "まにあわせる";
    const expectedResult = [
      ["間", "ま"],
      ["に", "に"],
      ["合", "あ"],
      ["わせる", "わせる"],
    ];

    expectKanaExtract(inputOriginal, inputKana, expectedResult)
  });
});
