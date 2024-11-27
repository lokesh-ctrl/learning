// https://leetcode.com/problems/middle-of-the-linked-list/description/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let p1 = head,
    p2 = head;

  while (p2 && p2.next != null) {
    p1 = p1.next;
    p2 = p2.next.next;
  }
  return p1;
};
module.exports = { middleNode };
