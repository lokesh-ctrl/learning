// Advent of Code: Day 6
const directions = ["^", ">", "v", "<"];
const moves = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
function solvePartOne(input) {
  const [grid, position, direction] = parseInput(input, directions);

  const visited = new Set();
  const rows = grid.length;
  const cols = grid[0].length;
  let cP = position;
  let cD = direction;

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

function solvePartTwo(input) {
  const [grid, gPosition, gDirection] = parseInput(input, directions);
  const rows = grid.length;
  const cols = grid[0].length;

  const simulateGuard = (obstruction) => {
    const visited = new Set();
    let [row, col] = gPosition;
    let direction = gDirection;

    while (true) {
      const key = `${row},${col},${direction}`;
      if (visited.has(key)) return true;
      visited.add(key);

      const [dr, dc] = moves[direction];
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
        return false;
      }

      const isBlocked =
        (nextRow === obstruction[0] && nextCol === obstruction[1]) ||
        grid[nextRow][nextCol] === "#";
      if (isBlocked) {
        direction = (direction + 1) % 4;
      } else {
        row = nextRow;
        col = nextCol;
      }
    }
  };

  const validPositions = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "." && !(r === gPosition[0] && c === gPosition[1])) {
        if (simulateGuard([r, c])) {
          validPositions.push([r, c]);
        }
      }
    }
  }

  return validPositions.length;
}

module.exports = { solvePartOne, solvePartTwo };
