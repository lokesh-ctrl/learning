// hard-23-merge-k-sorted-lists.js
// https://leetcode.com/problems/merge-k-sorted-lists/description/

const { mergeTwoLists } = require("./easy-21-merge-two-sorted-lists");
const { generateLinkedList } = require("./helper");

// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

// Merge all the linked-lists into one sorted linked-list and return it.

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // brute force
  /*
  let result = [];
  lists.forEach((list) => {
    while (list != null) {
      result.push(list.val);
      list = list.next;
    }
  });
  result.sort((a, b) => a - b);
  return generateLinkedList(result);
  */

  // early return
  if (!lists || !lists.length) return null;

  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const list1 = lists[i];
      const list2 = lists[i + 1] ?? null;
      const newList = mergeTwoLists(list1, list2);
      merged.push(newList);
    }
    lists = merged;
  }
  return lists[0];
};

module.exports = { mergeKLists };
