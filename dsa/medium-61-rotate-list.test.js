const { generateLinkedList } = require("./helper");
const { rotateRight } = require("./medium-61-rotate-list");
test("return correct value", () => {
  const inputList = generateLinkedList([1, 2, 3, 4, 5]);
  expect(rotateRight(inputList, 1)).toEqual(
    generateLinkedList([5, 1, 2, 3, 4])
  );
});

// test("return correct value", () => {
//   const inputList = generateLinkedList([1, 2, 3, 4, 5]);
//   expect(rotateRight(inputList, 2)).toEqual(
//     generateLinkedList([4, 5, 1, 2, 3])
//   );
// });

// test("return correct value", () => {
//   const inputList = generateLinkedList([]);
//   expect(rotateRight(inputList, 0)).toEqual(generateLinkedList([]));
// });

// test("return correct value", () => {
//   const inputList = generateLinkedList([1, 2]);
//   expect(rotateRight(inputList, 2)).toEqual(generateLinkedList([1, 2]));
// });
