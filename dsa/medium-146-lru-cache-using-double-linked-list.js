function Node(key, val, prev, next) {
  this.key = key === undefined ? 0 : key;
  this.val = val === undefined ? 0 : val;
  this.prev = prev === undefined ? null : prev;
  this.next = next === undefined ? null : next;
}

function DoubleLinkedList() {
  this.head = new Node(null, null, null, null);
  this.tail = new Node(null, null, this.head, null);
  this.head.next = this.tail;
}

function deleteNode(node, map) {
  map[node.key] = null;
  node.next.prev = node.prev;
  node.prev.next = node.next;
}

function deleteFirst(list, map) {
  const node = list.head.next;
  deleteNode(node, map);
  return node.key;
}

function insertNode(list, node, map) {
  node.next = list.tail;
  node.prev = list.tail.prev;
  list.tail.prev.next = node;
  list.tail.prev = node;
  map[node.key] = node;
}
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.currentCapacity = 0;
  this.list = new DoubleLinkedList();
  this.map = {};
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.map[key];
  if (node != undefined) {
    deleteNode(node, this.map);
    insertNode(this.list, node, this.map);
    return node.val;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const node = this.map[key];
  if (node != undefined) {
    node.val = value;
    deleteNode(node, this.map);
    insertNode(this.list, node, this.map);
  } else {
    const newNode = new Node(key, value);
    insertNode(this.list, newNode, this.map);
    this.currentCapacity++;
    if (this.capacity < this.currentCapacity) {
      deleteFirst(this.list, this.map);
      this.currentCapacity--;
    }
  }
  return null;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

module.exports = { LRUCache };
