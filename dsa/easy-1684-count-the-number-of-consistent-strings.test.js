const {
  countConsistentStrings,
} = require("./easy-1684-count-the-number-of-consistent-strings");
test("return correct value", () => {
  expect(
    countConsistentStrings("ab", ["ad", "bd", "aaab", "baa", "badab"])
  ).toEqual(2);
  expect(
    countConsistentStrings("abc", ["a", "b", "c", "ab", "ac", "bc", "abc"])
  ).toEqual(7);
});
