const { swimInWater } = require("./hard-778-swim-in-rising-water");
test("return correct value", () => {
  expect(
    swimInWater([
      [0, 2],
      [1, 3],
    ])
  ).toEqual(3);
});

test("return correct value", () => {
  expect(
    swimInWater([
      [0, 1, 2, 3, 4],
      [24, 23, 22, 21, 5],
      [12, 13, 14, 15, 16],
      [11, 17, 18, 19, 20],
      [10, 9, 8, 7, 6],
    ])
  ).toEqual(16);
});
