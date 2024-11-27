// https://leetcode.com/problems/palindrome-linked-list/description/

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let slow = head,
    fast = head;
  while (fast && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let prev = null;
  let current = slow;

  while (current) {
    let temp = current.next;
    current.next = prev;
    prev = current;
    current = temp;
  }

  while (prev) {
    if (prev.val != head.val) {
      return false;
    }
    prev = prev.next;
    head = head.next;
  }
  return true;
};
module.exports = { isPalindrome };
