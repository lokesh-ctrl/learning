const { solvePartOne, solvePartTwo } = require("./day04");
const fs = require("fs");
describe("Advent of Code - Day 4 Part One", () => {
  // test("Example Case", () => {
  //   const input = `MMMSXXMASM
  //   MSAMXMSMSA
  //   AMXSXMAAMM
  //   MSAMASMSMX
  //   XMASAMXAMM
  //   XXAMMXXAMA
  //   SMSMSASXSS
  //   SAXAMASAAA
  //   MAMMMXMMMM
  //   MXMXAXMASX`;
  //   expect(solvePartOne(input)).toBe(7);
  // });

  // test("Example Case 2", () => {
  //   const input = fs.readFileSync("./inputData/day04.text", "utf8");
  //   expect(solvePartOne(input)).toBe(2504);
  // });
});

describe("Advent of Code - Day 4 Part Two", () => {
  test("Example Case", () => {
    const input = `MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX`;
    expect(solvePartTwo(input)).toBe(9);
  });

  // test("Example Case 2", () => {
  //   const input = fs.readFileSync("./inputData/day04.text", "utf8");
  //   expect(solvePartTwo(input)).toBe(1923);
  // });
});
