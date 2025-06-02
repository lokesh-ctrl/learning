const { candy } = require("./hard-135-candy");
test("return correct value", () => {
  expect(candy([1, 0, 2])).toEqual(5);
});
test("return correct value", () => {
  expect(candy([1, 2, 2])).toEqual(4);
});

test("return correct value", () => {
  expect(candy([1, 2, 87, 87, 87, 2, 1])).toEqual(13);
});
