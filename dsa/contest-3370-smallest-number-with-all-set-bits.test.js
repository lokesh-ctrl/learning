const {
  smallestNumber,
} = require("./contest-3370-smallest-number-with-all-set-bits");
test("return correct value", () => {
  expect(smallestNumber(5)).toEqual(7);
  expect(smallestNumber(10)).toEqual(15);
  expect(smallestNumber(3)).toEqual(3);
});
