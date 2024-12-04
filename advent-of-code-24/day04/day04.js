// Advent of Code: Day 4
function solvePartOne(input) {
  const grid = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  const word = "XMAS";
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ];
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isValid(x, y) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  function searchFromPosition(x, y, dx, dy) {
    for (let i = 0; i < word.length; i++) {
      const newX = x + i * dx;
      const newY = y + i * dy;
      if (!isValid(newX, newY) || grid[newX][newY] != word[i]) {
        return false;
      }
    }
    return true;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "X") {
        for (const [dx, dy] of directions) {
          if (searchFromPosition(i, j, dx, dy)) {
            count++;
          }
        }
      }
    }
  }
  return count;
}

function solvePartTwo(input) {
  const grid = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(""));
  const directions = [
    [
      { x: 1, y: 1 },
      { x: -1, y: -1 },
    ],
    [
      { x: 1, y: -1 },
      { x: -1, y: 1 },
    ],
  ];
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isValid(x, y) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  function isValidDiagnols(x, y) {
    const diags = directions.flat().map((d) => {
      return [x + d.x, y + d.y];
    });
    for (let d of diags) {
      if (!isValid(d[0], d[1])) {
        return false;
      }
    }
    return true;
  }
  const words = ["SM", "MS"];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i] && grid[i][j] === "A" && isValidDiagnols(i, j)) {
        const word1 = directions[0]
          .map((d) => grid[i + d.x][j + d.y])
          .reduce((c, acc) => c + acc, "");
        const word2 = directions[1]
          .map((d) => grid[i + d.x][j + d.y])
          .reduce((c, acc) => c + acc, "");
        if (words.includes(word1) && words.includes(word2)) {
          count++;
        }
      }
    }
  }
  return count;
}

module.exports = { solvePartOne, solvePartTwo };
