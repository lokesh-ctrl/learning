const { findMinDifference } = require("./med-539-minimum-time-difference");
test("return correct value", () => {
  expect(findMinDifference(["23:59", "00:00"])).toEqual(1);
  expect(findMinDifference(["00:00", "23:59", "00:00"])).toEqual(0);
  expect(findMinDifference(["02:39", "10:26", "21:43"])).toEqual(296);
});
