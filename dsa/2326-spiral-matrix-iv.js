// You are given two integers m and n, which represent the dimensions of a matrix.

// You are also given the head of a linked list of integers.

// Generate an m x n matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with -1.

// Return the generated matrix.

// https://leetcode.com/problems/spiral-matrix-iv/description/?envType=daily-question&envId=2024-09-09

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {ListNode} head
 * @return {number[][]}
 */
var spiralMatrix = function (m, n, head) {
  const matrix = Array.from({ length: m }, () => Array(n).fill(-1));
  let t = 0,
    b = m - 1;
  l = 0;
  r = n - 1;
  let current = head;

  while (current && t <= b && l <= r) {
    for (let i = l; i <= r && current; i++) {
      matrix[t][i] = current.val;
      current = current.next;
    }
    t++;
    for (let i = t; i <= b && current; i++) {
      matrix[i][r] = current.val;
      current = current.next;
    }
    r--;
    for (let i = r; i >= l && current; i--) {
      matrix[b][i] = current.val;
      current = current.next;
    }
    b--;
    for (let i = b; i >= t && current; i--) {
      matrix[i][l] = current.val;
      current = current.next;
    }
    l++;
  }
  return matrix;
};

module.exports = { spiralMatrix };
