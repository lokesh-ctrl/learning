const {
  uncommonFromSentences,
} = require("./easy-884-uncommon-words-from-two-sentences");

test("return correct value", () => {
  expect(
    uncommonFromSentences("this apple is sweet", "this apple is sour")
  ).toEqual(["sweet", "sour"]);
});
