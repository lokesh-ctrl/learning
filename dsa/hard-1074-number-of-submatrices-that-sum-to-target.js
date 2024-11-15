// Given a matrix and a target, return the number of non-empty submatrices that sum to target.

// A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2.

// Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some coordinate that is different: for example, if x1 != x1'.
// https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/description/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
  const ROWS = matrix.length;
  const COLS = matrix[0].length;
  let prefixSum = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const top = r > 0 ? matrix[r - 1][c] : 0;
      const left = c > 0 ? matrix[r][c - 1] : 0;
      const topLeft = Math.min(r, c) > 0 ? matrix[r - 1][c - 1] : 0;
      console.log(top, left, topLeft, r, c);
      prefixSum[r][c] = matrix[r][c] + top + left - topLeft;
    }
  }

  return prefixSum;
};

module.exports = { numSubmatrixSumTarget };
