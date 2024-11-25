// https://leetcode.com/problems/rotate-list/description/
// Given the head of a linked list, rotate the list to the right by k places.

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head) return head;
  let tail = head,
    newHead = head;
  let length = 1;
  while (tail && tail.next) {
    length++;
    tail = tail.next;
  }
  let noOfRotationsToMake = k % length;

  // make circular linked list
  tail.next = head;
  // rotate n-k rotations
  // [1,2,3,4,5],1
  // tail is at start [5,1,2,3,4]
  // after 0 [1,2,3,4,5]
  // after 1 [2,3,4,5,1]
  // after 2 [3,4,5,1,2]
  // after 3 [4,5,1,2,3]
  // tail is [4,5,1,2,3]
  for (let i = 0; i < length - noOfRotationsToMake; i++) {
    console.log(tail);
    tail = tail.next;
  }
  // make newHead as [5,1,2,3,4]
  newHead = tail.next;
  console.log(newHead);
  tail.next = null;
  return newHead;

  //   if (noOfRotationsToMake <= 0) return head;
  //   tail = head;
  //   let newHead = head;
  //   for (let i = 0; i < noOfRotationsToMake; i++) {
  //     tail = tail.next;
  //   }
  //   while (tail.next != null) {
  //     tail = tail.next;
  //     newHead = newHead.next;
  //   }
  //   let temp = newHead.next;
  //   newHead.next = null;
  //   tail = temp;
  //   while (temp && temp.next) {
  //     temp = temp.next;
  //   }
  //   temp.next = head;
  //   return tail;
};
module.exports = { rotateRight };
