const { ListNode, reverseList } = require("./easy-206-reverse-linked-list");

const head2 = new ListNode(1, new ListNode(2));
const result2 = new ListNode(2, new ListNode(1));

test("return correct value", () => {
  expect(reverseList(head2)).toEqual(result2);
});

const head1 = new ListNode(1, new ListNode(2, new ListNode(3)));
const result1 = new ListNode(3, new ListNode(2, new ListNode(1)));

test("return correct value", () => {
  expect(reverseList(head1)).toEqual(result1);
});

const head3 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4)))
);
const result3 = new ListNode(
  4,
  new ListNode(3, new ListNode(2, new ListNode(1)))
);

test("return correct value", () => {
  expect(reverseList(head3)).toEqual(result3);
});

test("return correct value", () => {
  expect(reverseList(new ListNode())).toEqual(new ListNode());
});

test("return correct value", () => {
  expect(reverseList(new ListNode(1))).toEqual(new ListNode(1));
});
