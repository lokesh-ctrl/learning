const { maxProfit } = require("./easy-121-best-time-to-buy-and-sell-stock");
test("return correct value", () => {
  expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(5);
});
