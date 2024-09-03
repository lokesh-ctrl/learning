const { getLucky } = require("./1945-sum-of-digits");
test("return correct value", () => {
  expect(getLucky("zbax", 2)).toEqual(8);
  expect(getLucky("iiii", 1)).toEqual(36);
  expect(getLucky("leetcode", 2)).toEqual(6);
});
