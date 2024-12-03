// Advent of Code: Day 1
function solvePartOne(input) {
  const list1 = input[0].sort((a, b) => a - b);
  const list2 = input[1].sort((a, b) => a - b);
  let result = list1
    .map((value, i) => Math.abs(value - list2[i]))
    .reduce((c, sum) => c + sum, 0);
  return result;
}

function solvePartTwo(input) {
  const list1 = input[0];
  const list2 = input[1];
  const occurences = {};
  list2.forEach((e) => {
    if (occurences[e]) occurences[e] += 1;
    else occurences[e] = 1;
  });
  return list1
    .map((v) => v * (occurences[v] ? occurences[v] : 0))
    .reduce((c, sum) => c + sum, 0);
}
module.exports = { solvePartOne, solvePartTwo };
