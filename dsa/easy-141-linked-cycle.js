// easy-141-linked-cycle.js
// https://leetcode.com/problems/linked-list-cycle/description/

// Given head, the head of a linked list, determine if the linked list has a cycle in it.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

// Return true if there is a cycle in the linked list. Otherwise, return false.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let p1 = head;
  let p2 = head;

  while (p2 && p2.next != null) {
    p1 = p1.next;
    p2 = p2.next.next;
    if (p1 == p2) {
      return true;
    }
  }
  return false;
};

function ListNode(val, next) {
  this.val = val;
  this.next = next;
}

module.exports = { hasCycle, ListNode };
