const {
  getLargestOutlier,
} = require("./contest-3371-identify-the-largest-outlier-in-an-array");
test("return correct value", () => {
  expect(getLargestOutlier([2, 3, 5, 10])).toEqual(10);
  expect(getLargestOutlier([-2, -1, -3, -6, 4])).toEqual(4);
  expect(getLargestOutlier([1, 1, 1, 1, 1, 5, 5])).toEqual(5);
});
