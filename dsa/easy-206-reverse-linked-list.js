// https://leetcode.com/problems/reverse-linked-list/
// Given the head of a singly linked list, reverse the list, and return the reversed list.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var reverseList = function (head) {
  if (!head || !head?.next) {
    return head;
  }
  let prev = new ListNode(head.val);
  let current = head.next;
  let temp = head.next;
  while (current && current.next != null) {
    temp = current.next;
    current.next = prev;
    prev = current;
    current = temp;
  }
  current.next = prev;
  return current;
};

module.exports = { reverseList, ListNode };

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
