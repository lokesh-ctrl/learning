// Given the head of a linked list head, in which each node contains an integer value.

// Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

// Return the linked list after insertion.

// The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

// https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/description/?envType=daily-question&envId=2024-09-10

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

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

var insertGreatestCommonDivisors = function (head) {
  let result = [head.val];
  while (head.next) {
    const newNodeVal = getGCD(head.val, head.next.val);
    result.push(newNodeVal);
    result.push(head.next.val);
    head = head.next;
  }
  return arrayToLinkedList(result);
};

function arrayToLinkedList(arr) {
  if (arr.length === 0) return null;

  let head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

const getGCD = function (num1, num2) {
  const [smallest, largest] = num1 > num2 ? [num2, num1] : [num1, num2];
  let temp = smallest;
  if (temp == 0) {
    return 0;
  }
  while (temp > 0) {
    if (largest % temp == 0 && smallest % temp == 0) {
      return temp;
    } else {
      temp--;
    }
  }
  return 1;
};

module.exports = { insertGreatestCommonDivisors, getGCD };
