// https://leetcode.com/problems/ransom-note/description/

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const mapOfMagazine = {};
  for (let char of magazine) {
    if (mapOfMagazine[char]) mapOfMagazine[char] += 1;
    else mapOfMagazine[char] = 1;
  }
  for (let char of ransomNote) {
    if (mapOfMagazine[char] > 0) mapOfMagazine[char] -= 1;
    else return false;
  }
  return true;
};
module.exports = { canConstruct };
