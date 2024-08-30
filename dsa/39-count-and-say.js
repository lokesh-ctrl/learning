// The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

// countAndSay(1) = "1"
// countAndSay(n) is the run-length encoding of countAndSay(n - 1).
// Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".
// https://leetcode.com/problems/count-and-say/description/

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  if (n == 1) {
    return "1";
  }
  return rle(countAndSay(n - 1));
};

function rle(arr) {
  let temp = "";
  let current = arr[0];
  let currentCount = 1;
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] == current) {
      currentCount++;
    } else {
      temp += currentCount;
      temp += current;
      current = arr[i];
      currentCount = 1;
    }
  }
  return temp;
}

module.exports = { countAndSay };
