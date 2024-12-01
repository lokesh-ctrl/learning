function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function generateLinkedList(arr) {
  if (arr.length === 0) return null;

  // Start with the last element of the array
  let head = new ListNode(arr[arr.length - 1]);
  let current = head;

  // Iterate backwards through the array to create nodes
  for (let i = arr.length - 2; i >= 0; i--) {
    current = new ListNode(arr[i], current);
  }

  return current; // Return the head of the linked list
}

// Function to insert a value into the BST
function insertNode(root, value) {
  if (root === null) {
    return { value, left: null, right: null };
  }

  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else if (value > root.value) {
    root.right = insertNode(root.right, value);
  }

  return root;
}

// Function to build a BST from an array
function buildBSTFromArray(arr) {
  let root = null;
  arr.forEach((value) => {
    root = insertNode(root, value);
  });
  return root;
}

module.exports = { generateLinkedList, ListNode, TreeNode, buildBSTFromArray };
