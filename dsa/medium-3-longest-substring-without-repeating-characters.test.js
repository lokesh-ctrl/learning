const {
  lengthOfLongestSubstring,
} = require("./medium-3-longest-substring-without-repeating-characters");
test("return correct value", () => {
  expect(lengthOfLongestSubstring("bbbbb")).toEqual(1);
});

test("return correct value", () => {
  expect(lengthOfLongestSubstring("abcabcbb")).toEqual(3);
});

test("return correct value", () => {
  expect(lengthOfLongestSubstring("dvdf")).toEqual(3);
});
