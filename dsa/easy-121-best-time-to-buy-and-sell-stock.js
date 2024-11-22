// easy-121-best-time-to-buy-and-sell-stock.js
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let bP = prices[0];
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    bP = Math.min(prices[i], bP);
    profit = Math.max(profit, prices[i] - bP);
  }
  return profit;
};

module.exports = { maxProfit };
