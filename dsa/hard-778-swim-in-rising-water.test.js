const { swimInWater } = require("./hard-778-swim-in-rising-water");
test("return correct value", () => {
  expect(
    swimInWater([
      [0, 2],
      [1, 3],
    ])
  ).toEqual(3);
});
