// https://leetcode.com/problems/implement-queue-using-stacks/description/
// implement only using two stacks

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
    return null;
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  empty() {
    if (this.items.length == 0) {
      return true;
    }
    return false;
  }
}

var MyQueue = function () {
  this.stack1 = new Stack();
  this.stack2 = new Stack();
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  return this.stack1.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (this.stack2.empty()) {
    this.moveToSecond();
  }
  return this.stack2.pop();
};

MyQueue.prototype.moveToSecond = function () {
  while (!this.stack1.empty()) {
    const value = this.stack1.pop();
    this.stack2.push(value);
  }
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (this.stack2.empty()) {
    this.moveToSecond();
  }
  return this.stack2.peek();
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stack1.empty() && this.stack2.empty();
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
module.exports = { MyQueue };
