// https://leetcode.com/problems/candy/description/?envType=daily-question&envId=2025-06-02

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  let candies = Array(ratings.length).fill(1);
  let total = 0;
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i + 1] + 1, candies[i]);
    }
  }
  total = candies.reduce((sum, itr) => sum + itr, 0);
  return total;
};
module.exports = { candy };
