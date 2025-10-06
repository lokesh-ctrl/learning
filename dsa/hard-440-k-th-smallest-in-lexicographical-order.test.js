const {
  findKthNumber,
} = require("./hard-440-k-th-smallest-in-lexicographical-order");

test("return correct value", () => {
  expect(findKthNumber(1, 1)).toEqual(1);
});
