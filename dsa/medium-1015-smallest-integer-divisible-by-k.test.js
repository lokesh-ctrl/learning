const {
  smallestRepunitDivByK,
} = require("./medium-1015-smallest-integer-divisible-by-k");
test("return correct value", () => {
  expect(smallestRepunitDivByK(1)).toEqual(1);
});

test("return correct value", () => {
  expect(smallestRepunitDivByK(2)).toEqual(-1);
});

test("return correct value", () => {
  expect(smallestRepunitDivByK(3)).toEqual(3);
});
