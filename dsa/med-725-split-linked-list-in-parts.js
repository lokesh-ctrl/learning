// Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

// The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

// The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

// Return an array of the k parts.

// https://leetcode.com/problems/split-linked-list-in-parts/description/?envType=daily-question&envId=2024-09-08

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var splitListToParts = function (head, k) {
  const result = new Array(k).fill(null);
  let size = 0;
  let current = head;
  while (current) {
    size++;
    current = current.next;
  }

  let eachSplitSize = Math.floor(size / k);
  let remainder = size % k;
  current = head;
  let prev = null;

  for (let i = 0; i < k; i++) {
    result[i] = current;
    let curentSplitSize = remainder > 0 ? eachSplitSize + 1 : eachSplitSize;
    remainder--;

    while (current && curentSplitSize) {
      prev = current;
      current = current.next;
      curentSplitSize--;
    }
    // Cut the list
    if (prev) prev.next = null;
  }
  return result;
};

module.exports = { splitListToParts, ListNode };
