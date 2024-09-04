// A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot can receive a sequence of these three possible types of commands:

// -2: Turn left 90 degrees.
// -1: Turn right 90 degrees.
// 1 <= k <= 9: Move forward k units, one unit at a time.
// Some of the grid squares are obstacles. The ith obstacle is at grid point obstacles[i] = (xi, yi). If the robot runs into an obstacle, then it will instead stay in its current location and move on to the next command.

// Return the maximum Euclidean distance that the robot ever gets from the origin squared (i.e. if the distance is 5, return 25).

// Note:

// North means +Y direction.
// East means +X direction.
// South means -Y direction.
// West means -X direction.
// There can be obstacle in [0,0].

// https://leetcode.com/problems/walking-robot-simulation/description/?envType=daily-question&envId=2024-09-04

/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // N, E, S, W
  let x = 0,
    y = 0,
    directionIndex = 0,
    maxDistance = 0;
  const obstacleSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));

  for (let command of commands) {
    if (command === -2) {
      directionIndex = (directionIndex + 3) % 4;
    } else if (command === -1) {
      directionIndex = (directionIndex + 1) % 4;
    } else {
      const [dx, dy] = directions[directionIndex];
      for (let i = 0; i < command; i++) {
        const newX = x + dx;
        const newY = y + dy;
        if (obstacleSet.has(`${newX},${newY}`)) break;
        x = newX;
        y = newY;
        maxDistance = Math.max(maxDistance, x * x + y * y);
      }
    }
  }
  return maxDistance;
};

module.exports = { robotSim };
