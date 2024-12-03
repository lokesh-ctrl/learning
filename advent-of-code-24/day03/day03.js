// Advent of Code: Day 3
function solvePartOne(input) {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push([parseInt(match[1]), parseInt(match[2])]);
  }
  return matches.map((e) => e[0] * e[1]).reduce((c, sum) => c + sum, 0);
}

function solvePartTwo(input) {
  const regex = /(mul)\((\d+),(\d+)\)|(do)\(\)|(don't)\(\)/g;

  let match;
  const results = [];
  let enabled = true;

  while ((match = regex.exec(input)) !== null) {
    const [x, mul, num1, num2, on, off] = match;
    if (mul) {
      if (enabled) results.push([parseInt(num1), parseInt(num2)]);
    } else if (on) enabled = true;
    else if (off) enabled = false;
  }
  return results.map((e) => e[0] * e[1]).reduce((c, sum) => c + sum, 0);
}

module.exports = { solvePartOne, solvePartTwo };
