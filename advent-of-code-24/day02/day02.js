// Advent of Code: Day 2
function solvePartOne(input) {
  const array = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(" ").map(Number));
  let safeResult = 0;
  array.forEach((element) => {
    if (isSafe(element)) {
      safeResult += 1;
    }
  });
  return safeResult;
}

function solvePartTwo(input) {
  const array = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(" ").map(Number));
  let safeResult = 0;
  array.forEach((element) => {
    if (isReportSafe(element)) {
      safeResult += 1;
    }
  });
  return safeResult;
}

function isSafe(element) {
  let increasing = element[1] - element[0] > 0;
  let thisELementSafe = true;
  if (increasing) {
    for (let i = 1; i < element.length; i++) {
      if (
        element[i] - element[i - 1] < 1 ||
        Math.abs(element[i] - element[i - 1]) > 3
      ) {
        thisELementSafe = false;
      }
    }
  } else {
    for (let i = 1; i < element.length; i++) {
      if (
        element[i - 1] - element[i] < 1 ||
        Math.abs(element[i] - element[i - 1]) > 3
      ) {
        thisELementSafe = false;
      }
    }
  }
  return thisELementSafe;
}

// Function to determine if a report is safe with or without the Problem Dampener
function isReportSafe(report) {
  // Check if the original report is safe
  if (isSafe(report)) return true;

  // Try removing each element and check if the resulting array is safe
  for (let i = 0; i < report.length; i++) {
    let modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(modifiedReport)) return true;
  }

  // Report is unsafe even after using the Dampener
  return false;
}
module.exports = { solvePartOne, solvePartTwo };
