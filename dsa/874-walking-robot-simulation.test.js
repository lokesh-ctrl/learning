const { robotSim } = require("./874-walking-robot-simulation");
test("return correct value", () => {
  expect(robotSim([4, -1, 3], [])).toEqual(25);
  expect(robotSim([4, -1, 4, -2, 4], [[2, 4]])).toEqual(65);
  expect(robotSim([6, -1, -1, 6], [])).toEqual(36);
});
test("return correct value1", () => {
  expect(
    robotSim(
      [7, -2, -2, 7, 5],
      [
        [-3, 2],
        [-2, 1],
        [0, 1],
        [-2, 4],
        [-1, 0],
        [-2, -3],
        [0, -3],
        [4, 4],
        [-3, 3],
        [2, 2],
      ]
    )
  ).toEqual(4);
});
