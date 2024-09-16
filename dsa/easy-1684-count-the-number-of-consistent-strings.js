// You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.

// Return the number of consistent strings in the array words.

// https://leetcode.com/problems/count-the-number-of-consistent-strings/description/?envType=daily-question&envId=2024-09-12

/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words) {
  let result = 0;
  const allowedSet = new Set(allowed);
  words.forEach((word) => {
    const wordSet = new Set(word);
    if (
      allowedSet.size >= wordSet.size &&
      haveSameDistinctChars(wordSet, allowedSet)
    ) {
      result++;
    }
  });
  return result;
};

const haveSameDistinctChars = function (set1, set2) {
  for (let char of set1) {
    if (!set2.has(char)) {
      return false;
    }
  }
  return true;
};

module.exports = { countConsistentStrings };
