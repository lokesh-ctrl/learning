const {
  chalkReplacer,
} = require("./1894-med-find-the-student-that-will-replace-the-chalk");
test("return correct value", () => {
  expect(chalkReplacer([5, 1, 5], 22)).toEqual(0);
  expect(chalkReplacer([3, 4, 1, 2], 25)).toEqual(1);
  expect(
    chalkReplacer([3, 22, 9, 28, 48, 40, 47, 5, 19, 4, 9, 7, 11, 48], 953)
  ).toEqual(3);
});
