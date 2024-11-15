const { mergeTwoLists } = require("./easy-21-merge-two-sorted-lists");
const { generateLinkedList } = require("./helper");

const head1 = generateLinkedList([1, 2, 4]);
const head2 = generateLinkedList([1, 3, 4]);

const result = generateLinkedList([1, 1, 2, 3, 4, 4]);

test("return correct value", () => {
  expect(mergeTwoLists(head1, head2)).toEqual(result);
});

const head3 = generateLinkedList([]);
const head4 = generateLinkedList([]);

test("return correct value", () => {
  expect(mergeTwoLists(head3, head4)).toEqual(head3);
});

const head5 = generateLinkedList([1]);
const head6 = generateLinkedList([]);

test("return correct value", () => {
  expect(mergeTwoLists(head5, head6)).toEqual(head5);
});
