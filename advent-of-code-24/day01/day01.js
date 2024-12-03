// Advent of Code: Day 1
function solvePartOne(input) {
  const list1 = input[0].sort((a, b) => a - b);
  const list2 = input[1].sort((a, b) => a - b);
  let result = 0;

  for (let i = 0; i < list1.length; i++) {
    result += Math.abs(list1[i] - list2[i]);
  }
  return result;
}

function solvePartTwo(input) {
  const list1 = input[0];
  const list2 = input[1];
  let result = 0;
  const noOfOccurences = {};
  list2.forEach((element) => {
    if (noOfOccurences[element]) {
      noOfOccurences[element] = noOfOccurences[element] + 1;
    } else {
      noOfOccurences[element] = 1;
    }
  });

  for (let i = 0; i < list1.length; i++) {
    if (noOfOccurences[list1[i]]) {
      result += list1[i] * noOfOccurences[list1[i]];
    }
  }
  return result;
}
module.exports = { solvePartOne, solvePartTwo };
