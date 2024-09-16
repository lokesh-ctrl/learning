// Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
// https://leetcode.com/problems/minimum-time-difference/description/?envType=daily-question&envId=2024-09-16

/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
  let pointsInMins = [];
  timePoints.forEach((point) => {
    const [hours, mins] = point.split(":");
    const inTotalMins = parseInt(hours) * 60 + parseInt(mins);
    pointsInMins.push(inTotalMins);
    pointsInMins.push(inTotalMins + 1440);
  });
  pointsInMins = pointsInMins.sort((a, b) => a - b);
  let min = 1440;
  for (let i = 1; i < pointsInMins.length; i++) {
    min = Math.min(Math.abs(pointsInMins[i] - pointsInMins[i - 1]), min);
  }
  return min;
};

module.exports = { findMinDifference };
