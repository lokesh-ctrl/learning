const { isBalanced } = require("./easy-110-balanced-binary-tree");
const { TreeNode } = require("./helper");
test("return correct value", () => {
  const root = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
  );
  expect(isBalanced(root)).toEqual(true);
});

test("return correct value", () => {
  const root = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7, null, new TreeNode(1)))
  );
  expect(isBalanced(root)).toEqual(false);
});

test("return correct value", () => {
  const root = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(7)));
  expect(isBalanced(root)).toEqual(false);
});

test("return correct value", () => {
  const root = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4, new TreeNode(8)), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6))
  );
  expect(isBalanced(root)).toEqual(true);
});
