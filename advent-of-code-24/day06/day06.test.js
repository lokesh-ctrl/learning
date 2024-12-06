const { solvePartOne, solvePartTwo } = require("./day06");
const fs = require("fs");
describe("Advent of Code - Day 6 Part One", () => {
  test("Example Case", () => {
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
    expect(solvePartOne(input)).toBe(41);
  });

  test("Example Case 2", () => {
    const input = fs.readFileSync("./inputData/day06.text", "utf8");
    expect(solvePartOne(input)).toBe(41);
  });
});

describe("Advent of Code - Day 6 Part Two", () => {
  test("Example Case", () => {
    const input = fs.readFileSync("./inputData/day06.text", "utf8");
    expect(solvePartTwo(input)).toBe(/* expected output */);
  });
});
