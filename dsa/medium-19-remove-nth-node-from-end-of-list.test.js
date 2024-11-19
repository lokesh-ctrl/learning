const {
  removeNthFromEnd,
} = require("./medium-19-remove-nth-node-from-end-of-list");
const { generateLinkedList } = require("./helper");
test("return correct value", () => {
  const input = generateLinkedList([1, 2, 3, 4, 5]);
  const result = generateLinkedList([1, 2, 3, 5]);

  expect(removeNthFromEnd(input, 2)).toEqual(result);
});

test("return correct value", () => {
  const input = generateLinkedList([1]);
  const result = generateLinkedList([]);

  expect(removeNthFromEnd(input, 1)).toEqual(result);
});

test("return correct value", () => {
  const input = generateLinkedList([1, 2]);
  const result = generateLinkedList([1]);

  expect(removeNthFromEnd(input, 1)).toEqual(result);
});
