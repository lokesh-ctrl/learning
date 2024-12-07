const { solvePartOne, solvePartTwo } = require("./day07");
const file = require("fs");
describe("Advent of Code - Day 7 Part One", () => {
  test("Example Case", () => {
    const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
    expect(solvePartOne(input)).toBe(3749);
  });
  test("example case 2", () => {
    const input = file.readFileSync("./inputData/day07.text", "utf8");
    expect(solvePartOne(input)).toBe(14711933466277);
  });
});

describe("Advent of Code - Day 7 Part Two", () => {
  test("Example Case", () => {
    const input = "";
    expect(solvePartTwo(input)).toBe(/* expected output */);
  });
});
