const { ListNode, hasCycle } = require("./easy-141-linked-cycle");

const head = new ListNode(1, new ListNode(2));

test("return correct value", () => {
  expect(hasCycle(head)).toEqual(false);
});

const final = new ListNode(4);
const head2 = new ListNode(3, new ListNode(2, new ListNode(0, final)));
final.next = head2;

test("return correct value", () => {
  expect(hasCycle(head2)).toEqual(true);
});
