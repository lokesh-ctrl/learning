// easy-1-two-sum.js
// https://leetcode.com/problems/two-sum/

//Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  /*
  // Brute force
  // Time - O(n*n)
  // space - O(1)
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }

  */
  // sorting
  // Time - O(nlogn) - because of sorting
  // space - O(n)
  /*

  let A = [];
  for (let i = 0; i < nums.length; i++) {
    A.push([nums[i], i]);
  }
  A.sort((a, b) => a[0] - b[0]);
  let i = 0,
    j = nums.length - 1,
    sum = 0;
  while (i < j) {
    sum = A[i][0] + A[j][0];
    if (sum == target) {
      return [A[i][1], A[j][1]];
    } else if (sum < target) {
      i++;
    } else {
      j--;
    }
  }
  return [];

  */

  // hash map
  // time - O(n)
  // space - O(n)

  const map = {};
  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = i;
  }

  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (map[diff] != undefined && map[diff] != i) {
      return [i, map[diff]];
    }
  }
  return [];
};

module.exports = { twoSum };
