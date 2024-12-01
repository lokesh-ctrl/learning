// https://leetcode.com/problems/flood-fill/description/
// You are given an image represented by an m x n grid of integers image, where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill:

// Begin with the starting pixel and change its color to color.
// Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel.
// Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color if it matches the original color of the starting pixel.
// The process stops when there are no more adjacent pixels of the original color to update.
// Return the modified image after performing the flood fill.

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  // change current to desired color
  let orignalColor = image[sr][sc];
  if (orignalColor == color) {
    return image;
  }
  image[sr][sc] = color;
  // check if left contains same color
  if (sr - 1 >= 0 && image[sr - 1][sc] == orignalColor) {
    image = floodFill(image, sr - 1, sc, color);
  }
  // check top
  if (sc - 1 >= 0 && image[sr][sc - 1] == orignalColor) {
    image = floodFill(image, sr, sc - 1, color);
  }
  // check bottom
  if (sc + 1 < image[0].length && image[sr][sc + 1] == orignalColor) {
    image = floodFill(image, sr, sc + 1, color);
  }
  // check right
  if (sr + 1 < image.length && image[sr + 1][sc] == orignalColor) {
    image = floodFill(image, sr + 1, sc, color);
  }
  return image;
};

module.exports = { floodFill };
