// medium-143-reorder-list.js
// https://leetcode.com/problems/reorder-list/description/

const { reverseList } = require("./easy-206-reverse-linked-list");
const { ListNode } = require("./helper");

// You are given the head of a singly linked-list. The list can be represented as:

// L0 → L1 → … → Ln - 1 → Ln
// Reorder the list to be on the following form:

// L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// You may not modify the values in the list's nodes. Only nodes themselves may be changed.
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  // early return
  if (head === null || head.next === null) {
    return head;
  }

  // find middle
  let fast = head;
  let slow = head;
  while (fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // reverse second half
  let prev = null;
  let current = slow;
  while (current) {
    let temp = current.next;
    current.next = prev;
    prev = current;
    current = temp;
  }

  // merge first and second halfs
  let first = head;
  let second = prev;
  while (second.next) {
    let temp = first.next;
    let temp2 = second.next;

    first.next = second;
    second.next = temp;

    first = temp;
    second = temp2;
  }
  return head;
};

module.exports = { reorderList };
