// https://leetcode.com/problems/swap-nodes-in-pairs/description/

const { ListNode } = require("./helper");

// Given a linked list, swap every two adjacent nodes and return its head.
// You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  let ans = new ListNode(0);
  ans.next = head;
  let current = ans;

  while (current.next != null && current.next.next != null) {
    let first = current.next;
    let second = current.next.next;

    current.next = second;
    first.next = second.next;
    second.next = first;
    current = current.next.next;
  }
  return ans.next;
};
module.exports = { swapPairs };
