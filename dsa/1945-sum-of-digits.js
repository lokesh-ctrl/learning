// You are given a string s consisting of lowercase English letters, and an integer k.

// First, convert s into an integer by replacing each letter with its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 'z' with 26). Then, transform the integer by replacing it with the sum of its digits. Repeat the transform operation k times in total.

// For example, if s = "zbax" and k = 2, then the resulting integer would be 8 by the following operations:

// Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
// Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
// Transform #2: 17 ➝ 1 + 7 ➝ 8
// Return the resulting integer after performing the operations described above.
// https://leetcode.com/problems/sum-of-digits-of-string-after-convert/description/?envType=daily-question&envId=2024-09-03

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLucky = function (s, k) {
  let num = "";
  for (let i = 0; i < s.length; i++) {
    num += s[i].charCodeAt(0) - 96;
  }
  let temp = 0;
  for (let i = 0; i < k; i++) {
    for (let i = 0; i < num.length; i++) {
      temp += parseInt(num[i]);
    }
    num = "" + temp;
    temp = 0;
  }
  return parseInt(num);
};

module.exports = { getLucky };
