// https://leetcode.com/problems/balanced-binary-tree/
// Given a binary tree, determine if it is height-balanced.
// A height-balanced binary tree is a binary tree in which the depth
// of the two subtrees of every node never differs by more than one.

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
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (root == null) return true;
  if (HeightOfTree(root) == -1) return false;
  return true;
};

function HeightOfTree(root) {
  if (root == null) return 0;

  let leftHeight = HeightOfTree(root.left);
  let rightHeight = HeightOfTree(root.right);

  if (leftHeight == -1 || rightHeight == -1) return -1;

  if (Math.abs(leftHeight - rightHeight) > 1) return -1;

  return Math.max(leftHeight, rightHeight) + 1;
}
module.exports = { isBalanced };
