const { mergeKLists } = require("./hard-23-merge-k-sorted-lists");
const { generateLinkedList } = require("./helper");
test("return correct value", () => {
  const l1 = generateLinkedList([1, 3]);
  const l2 = generateLinkedList([2, 4]);
  const result = generateLinkedList([1, 2, 3, 4]);

  expect(mergeKLists([l1, l2])).toEqual(result);
});

test("return correct value", () => {
  const l1 = generateLinkedList([1, 4, 5]);
  const l2 = generateLinkedList([1, 3, 4]);
  const l3 = generateLinkedList([2, 6]);
  const result = generateLinkedList([1, 1, 2, 3, 4, 4, 5, 6]);

  expect(mergeKLists([l1, l2, l3])).toEqual(result);
});
