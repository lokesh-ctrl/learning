// https://leetcode.com/problems/invert-binary-tree/

const { TreeNode } = require("./helper");

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) {
    return root;
  }
  return new TreeNode(root.val, invertTree(root.right), invertTree(root.left));
};
module.exports = { invertTree };
