const { solution } = require("./easy-278-first-bad-version");
const isBadVersion = (badNumber) => {
  return function (number) {
    if (number == badNumber) return true;
    return false;
  };
};
test("return correct value", () => {
  expect(solution(isBadVersion(4))(5)).toEqual(4);
});
