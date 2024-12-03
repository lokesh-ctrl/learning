const fs = require("fs");
const { solvePartOne, solvePartTwo } = require("./day03");

describe("Advent of Code - Day 3 Part One", () => {
  test("Example Case", () => {
    const input =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    expect(solvePartOne(input)).toBe(161);
  });

  test("Example Case 2", () => {
    const input = fs.readFileSync("./inputData/day03.text", "utf8");
    expect(solvePartOne(input)).toBe(174336360);
  });
});

describe("Advent of Code - Day 3 Part Two", () => {
  test("Example Case", () => {
    const input =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    expect(solvePartTwo(input)).toBe(48);
  });

  test("Example Case 2", () => {
    const input = fs.readFileSync("./inputData/day03.text", "utf8");
    expect(solvePartTwo(input)).toBe(88802350);
  });
});
