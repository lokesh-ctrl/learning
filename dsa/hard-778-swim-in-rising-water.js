/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  const n = grid.length;
  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  const heap = [[grid[0][0], 0, 0]];
  visited[0][0] = true;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);

    const [maxVal, x, y] = heap.shift();
    if (x === n - 1 && y === n - 1) return maxVal;

    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy;

      if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny]) {
        visited[nx][ny] = true;
        heap.push([Math.max(maxVal, grid[nx][ny]), nx, ny]);
      }
    }
  }
  return -1;
};

module.exports = { swimInWater };
