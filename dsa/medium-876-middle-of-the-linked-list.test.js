const { generateLinkedList } = require("./helper");
const { middleNode } = require("./medium-876-middle-of-the-linked-list");
test("return correct value", () => {
  const input = generateLinkedList([1, 2, 3, 4, 5]);
  const output = generateLinkedList([3, 4, 5]);
  expect(middleNode(input)).toEqual(output);
});

test("return correct value", () => {
  const input = generateLinkedList([1, 2, 3, 4, 5, 6]);
  const output = generateLinkedList([4, 5, 6]);
  expect(middleNode(input)).toEqual(output);
});
