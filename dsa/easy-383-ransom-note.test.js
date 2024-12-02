const { canConstruct } = require("./easy-383-ransom-note");
test("return correct value", () => {
  expect(canConstruct("a", "b")).toEqual(false);
  expect(canConstruct("aa", "ab")).toEqual(false);
  expect(canConstruct("aa", "aab")).toEqual(true);
});
