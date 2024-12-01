const { MyQueue } = require("./easy-232-implement-queue-using-stacks");
test("return correct value", () => {
  let myQueue = new MyQueue();
  expect(myQueue.push(1)).toEqual(null);
  expect(myQueue.push(2)).toEqual(null);
  expect(myQueue.peek()).toEqual(1);
  expect(myQueue.pop()).toEqual(1);
  expect(myQueue.empty()).toEqual(false);
});
