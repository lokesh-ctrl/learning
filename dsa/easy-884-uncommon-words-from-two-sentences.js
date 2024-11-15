// A sentence is a string of single-space separated words where each word consists only of lowercase letters.

// A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

// Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

// https://leetcode.com/problems/uncommon-words-from-two-sentences/description/?envType=daily-question&envId=2024-09-17

/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  let words = [];
  let map = {};
  words.push(...s1.split(" "));
  words.push(...s2.split(" "));
  words.forEach((word) => {
    if (map[word]) {
      map[word] = map[word] + 1;
    } else {
      map[word] = 1;
    }
  });
  let result = [];
  for (const [key, value] of Object.entries(map)) {
    if (value == 1) {
      result.push(key);
    }
  }
  return result;
};

module.exports = { uncommonFromSentences };
