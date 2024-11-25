const { invertTree } = require("./easy-226-invert-binary-tree");
const { TreeNode } = require("./helper");

test("return correct value", () => {
  const input = new TreeNode(2, new TreeNode(1), new TreeNode(3));
  const output = new TreeNode(2, new TreeNode(3), new TreeNode(1));
  expect(invertTree(input)).toEqual(output);
});

test("return correct value", () => {
  const input = new TreeNode(
    4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(7, new TreeNode(6), new TreeNode(9))
  );
  const output = new TreeNode(
    4,
    new TreeNode(7, new TreeNode(9), new TreeNode(6)),
    new TreeNode(2, new TreeNode(3), new TreeNode(1))
  );
  expect(invertTree(input)).toEqual(output);
});
