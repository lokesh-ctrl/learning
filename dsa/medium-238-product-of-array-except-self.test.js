const {
  productExceptSelf,
} = require("./medium-238-product-of-array-except-self");
test("return correct value", () => {
  expect(productExceptSelf([2, 5, 3, 4])).toEqual([60, 24, 40, 30]);
});
