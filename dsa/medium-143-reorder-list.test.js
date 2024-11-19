const { reorderList } = require("./medium-143-reorder-list");
const { generateLinkedList } = require("./helper");

test("return correct value", () => {
  const input = generateLinkedList([1]);
  const output = generateLinkedList([1]);

  expect(reorderList(input)).toEqual(output);
});

test("return correct value", () => {
  const input = generateLinkedList([1, 2, 3]);
  const output = generateLinkedList([1, 3, 2]);

  expect(reorderList(input)).toEqual(output);
});

test("return correct value", () => {
  const input = generateLinkedList([1, 2, 3, 4, 5]);
  const output = generateLinkedList([1, 5, 2, 4, 3]);

  expect(reorderList(input)).toEqual(output);
});
