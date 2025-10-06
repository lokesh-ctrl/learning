// https://leetcode.com/problems/swim-in-rising-water/description/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  // first check lowest num in surroundings
  let current = grid[0][0];
  let currentPosition = [0, 0];
  const final = [grid.length - 1, grid.length - 1];
  let positions = [
    { x: 0, y: 1 }, //up
    { x: 0, y: -1 }, // down
    { x: 1, y: 0 }, // right
    { x: -1, y: 0 }, //left
  ];
  let time = 0;
  while (final[0] != currentPosition[0] || final[1] != currentPosition[1]) {
    let surroundingPositions = positions.map((position) => {
      let x = currentPosition[0] + position.x;
      let y = currentPosition[1] + position.y;
      if (x >= 0 && y >= 0 && x < grid.length && y < grid.length) {
        return grid[x][y];
      } else {
        return 100000;
      }
    });
    // Find least in 4 directions
    let least = Math.min(...surroundingPositions);
    let leastIndex = surroundingPositions.findIndex((value) => value == least);
    time += least - current;
    current = least;
    currentPosition = [
      currentPosition[0] + positions[leastIndex].x,
      currentPosition[1] + positions[leastIndex].y,
    ];
    console.log("after iteration", currentPosition, final);
  }
  return time;
};

module.exports = { swimInWater };
