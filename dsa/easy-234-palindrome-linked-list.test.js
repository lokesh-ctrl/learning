const { isPalindrome } = require("./easy-234-palindrome-linked-list");
const { generateLinkedList } = require("./helper");

test("return correct value", () => {
  const input = generateLinkedList([1, 2, 2, 1]);
  expect(isPalindrome(input)).toEqual(true);

  const input2 = generateLinkedList([1, 2, 2, 3, 1]);
  expect(isPalindrome(input2)).toEqual(false);
});
