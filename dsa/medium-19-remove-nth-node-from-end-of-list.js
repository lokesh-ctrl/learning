// medium-19-remove-nth-node-from-end-of-list.js
// https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/
// Given the head of a linked list, remove the nth node from the end of the list and return its head.

const { ListNode } = require("./helper");

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let res = new ListNode(0, head);
  let slow = res;
  let fast = head;
  let count = 0;
  while (count < n) {
    fast = fast.next;
    count++;
  }
  while (fast != null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return res.next;
};

module.exports = { removeNthFromEnd };
