// https://leetcode.com/problems/climbing-stairs/description/
/**
 * @param {number} n
 * @return {number}
 */

let map = { 1: 1, 2: 2 };
var climbStairs = function (n) {
  if (map[n]) return map[n];
  else map[n] = climbStairs(n - 1) + climbStairs(n - 2);
  return map[n];
};
module.exports = { climbStairs };
