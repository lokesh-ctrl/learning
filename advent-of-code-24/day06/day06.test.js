const { solvePartOne, solvePartTwo } = require("./day06");
const fs = require("fs");
const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
describe("Advent of Code - Day 6 Part One", () => {
  test("Example Case", () => {
    expect(solvePartOne(input)).toBe(41);
  });

  test("Example Case 2", () => {
    const input = fs.readFileSync("./inputData/day06.text", "utf8");
    expect(solvePartOne(input)).toBe(5453);
  });
});

describe("Advent of Code - Day 6 Part Two", () => {
  test("Example Case", () => {
    expect(solvePartTwo(input)).toBe(6);
  });
  test("Example Case", () => {
    const input = fs.readFileSync("./inputData/day06.text", "utf8");
    expect(solvePartTwo(input)).toBe(2188);
  });
});
