const { longestPalindrome } = require("./easy-409-longest-palindrome");
test("return correct value", () => {
  expect(longestPalindrome("abccccdd")).toEqual(7);
  expect(longestPalindrome("a")).toEqual(1);
});
