const {
  numSubmatrixSumTarget,
} = require("./hard-1074-number-of-submatrices-that-sum-to-target");
test("return correct value", () => {
  expect(
    numSubmatrixSumTarget(
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      0
    )
  ).toEqual(4);
});
