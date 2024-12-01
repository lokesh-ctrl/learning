const { swapPairs } = require("./medium-24-swap-nodes-in-pairs");
const { generateLinkedList } = require("./helper");
test("return correct value", () => {
  const input = generateLinkedList([1, 2, 3, 4]);
  const output = generateLinkedList([2, 1, 4, 3]);
  expect(swapPairs(input)).toEqual(output);
});
