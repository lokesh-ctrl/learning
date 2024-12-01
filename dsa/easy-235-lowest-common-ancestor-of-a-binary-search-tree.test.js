const {
  lowestCommonAncestor,
} = require("./easy-235-lowest-common-ancestor-of-a-binary-search-tree");
const { buildBSTFromArray, TreeNode } = require("./helper");
test("return correct value", () => {
  let input = buildBSTFromArray([2, 1]);
  expect(lowestCommonAncestor(input, new TreeNode(2), new TreeNode(1))).toEqual(
    input
  );
});

test("return correct value", () => {
  let input = buildBSTFromArray([6, 2, 8, 0, 4, 7, 9, 3, 5]);
  expect(lowestCommonAncestor(input, new TreeNode(2), new TreeNode(8))).toEqual(
    input
  );
});

test("return correct value", () => {
  let input = buildBSTFromArray([6, 2, 8, 0, 4, 7, 9, 3, 5]);
  expect(lowestCommonAncestor(input, new TreeNode(2), new TreeNode(4))).toEqual(
    input
  );
});
