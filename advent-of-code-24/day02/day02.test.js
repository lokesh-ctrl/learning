const { solvePartOne, solvePartTwo } = require("./day02.js");
const fs = require("fs");
describe("Advent of Code - Day 2", () => {
  test("Example Case", () => {
    const input = `7 6 4 2 1
    1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
    expect(solvePartOne(input)).toBe(2);
  });

  test("Example Case", () => {
    const input = fs.readFileSync("./inputData/day2.text", "utf8");
    expect(solvePartOne(input)).toBe(282);
  });
});

describe("Advent of Code - Day 2 part two", () => {
  test("Example Case", () => {
    const input = `7 6 4 2 1
    1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
    expect(solvePartTwo(input)).toBe(4);
  });

  test("Example Case", () => {
    const input = fs.readFileSync("./inputData/day2.text", "utf8");
    expect(solvePartTwo(input)).toBe(349);
  });
});
