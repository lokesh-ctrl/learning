const { countAndSay } = require("./39-count-and-say");
test("count and say should return correct values", () => {
  expect(countAndSay(1)).toEqual("1");
  expect(countAndSay(4)).toEqual("1211");
});
