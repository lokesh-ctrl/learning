// https://leetcode.com/problems/longest-palindrome/description/
// Given a string s which consists of lowercase or uppercase letters, return the length of the longest
// palindrome
//  that can be built with those letters.

// Letters are case sensitive, for example, "Aa" is not considered a palindrome.

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  let map = new Map();
  for (let char of s) {
    if (map.has(char)) map.set(char, map.get(char) + 1);
    else map.set(char, 1);
  }
  let result = 0;
  let hasOdd = false;

  map.forEach((value, key) => {
    if (value % 2 == 0) result += value;
    else {
      result += value - 1;
      hasOdd = true;
    }
  });
  return hasOdd ? result + 1 : result;
};
module.exports = { longestPalindrome };
