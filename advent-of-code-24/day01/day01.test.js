const { solvePartOne, solvePartTwo } = require("./day01.js");
const { parseFileToArrays } = require("../helper.js");
describe("Advent of Code - Day 1", () => {
  test("Example Case", () => {
    const input = [
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ];
    expect(solvePartOne(input)).toBe(11);
  });

  test("Example Case 2", () => {
    const input = parseFileToArrays("./day1.text");
    expect(solvePartOne(input)).toBe(3508942);
  });
});

describe("Advent of Code - Day 1 - part 2", () => {
  test("Example Case", () => {
    const input = [
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ];
    expect(solvePartTwo(input)).toBe(31);
  });

  test("Example Case 2", () => {
    const input = parseFileToArrays("./day1.text");
    expect(solvePartTwo(input)).toBe(3508942);
  });
});
