const {
  minBitFlips,
} = require("./easy-2220-minimum-bit-flips-to-convert-number");

test("return correct value", () => {
  expect(minBitFlips(10, 7)).toEqual(3);
  expect(minBitFlips(3, 4)).toEqual(3);
});
