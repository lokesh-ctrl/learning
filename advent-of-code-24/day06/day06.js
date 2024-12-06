// Advent of Code: Day 6
function solvePartOne(input) {
  const directions = ["^", ">", "v", "<"];
  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const [grid, position, direction] = parseInput(input, directions);

  const visited = new Set();
  const rows = grid.length;
  const cols = grid[0].length;
  let cP = position;
  let cD = direction;
  console.log(grid);

  while (true) {
    const [row, col] = cP;
    visited.add(`${row},${col}`);
    const [dr, dc] = moves[cD];
    const nextR = row + dr;
    const nextC = col + dc;
    if (nextR < 0 || nextR >= rows || nextC < 0 || nextC >= cols) {
      break;
    }
    if (grid[nextR][nextC] == "#") {
      cD = (cD + 1) % 4;
    } else {
      cP = [nextR, nextC];
    }
  }
  return visited.size;
}
function parseInput(input, directions) {
  let position = [];
  let direction = 0;
  const grid = input
    .trim()
    .split("\n")
    .map((line, row) => {
      return line
        .trim()
        .split("")
        .map((e, col) => {
          if (directions.includes(e)) {
            position = [row, col];
            direction = directions.indexOf(e);
            return ".";
          }
          return e;
        });
    });
  return [grid, position, direction];
}

function solvePartTwo(input) {}

module.exports = { solvePartOne, solvePartTwo };
