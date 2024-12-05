const { solvePartOne, solvePartTwo } = require("./day05");
const fs = require("fs");

const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
describe("Advent of Code - Day 5 Part One", () => {
  test("Example Case", () => {
    expect(solvePartOne(input)).toBe(143);
  });

  test("Example Case 2", () => {
    const input = fs.readFileSync("./inputData/day05.text", "utf8");
    expect(solvePartOne(input)).toBe(5268);
  });
});

describe("Advent of Code - Day 5 Part Two", () => {
  test("Example Case", () => {
    expect(solvePartTwo(input)).toBe(123);
  });

  test("Example Case 2", () => {
    const input = fs.readFileSync("./inputData/day05.text", "utf8");
    expect(solvePartTwo(input)).toBe();
  });
});
