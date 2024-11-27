// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

function lengthOfLongestSubstring(s) {
  let charMap = {};
  for (let i = 0; i < s.length; i++) {
    charMap[s[i]] = charMap[s[i]] ? charMap[s[i]] + 1 : 1;
  }
  let start = 0,
    end = s.length - 1;
  while (end > start) {
    if()
  }
  return end - start;
}
module.exports = { lengthOfLongestSubstring };
