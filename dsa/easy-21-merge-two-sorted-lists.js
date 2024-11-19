// easy-21-merge-two-sorted-lists.js
// https://leetcode.com/problems/merge-two-sorted-lists/description/

const { ListNode } = require("./helper");

/* You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.
*/
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode(0);
  let next = dummy;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      next.next = new ListNode(list1.val);
      list1 = list1.next;
    } else {
      next.next = new ListNode(list2.val);
      list2 = list2.next;
    }
    next = next.next;
  }
  next.next = list1 || list2;
  return dummy.next;
};

module.exports = { mergeTwoLists };
