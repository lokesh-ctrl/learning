const {
  splitListToParts,
  ListNode,
} = require("./med-725-split-linked-list-in-parts");

test("return correct value", () => {
  const head = new ListNode(1, new ListNode(2, new ListNode(3)));
  const result = [
    new ListNode(1),
    new ListNode(2),
    new ListNode(3),
    null,
    null,
  ];
  expect(splitListToParts(head, 5)).toEqual(result);
});

test("return correct value", () => {
  const head = new ListNode(
    1,
    new ListNode(
      2,
      new ListNode(
        3,
        new ListNode(
          4,
          new ListNode(
            5,
            new ListNode(
              6,
              new ListNode(
                7,
                new ListNode(8, new ListNode(9, new ListNode(10)))
              )
            )
          )
        )
      )
    )
  );
  const result = [
    new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4)))),
    new ListNode(5, new ListNode(6, new ListNode(7))),
    new ListNode(8, new ListNode(9, new ListNode(10))),
  ];
  expect(splitListToParts(head, 3)).toEqual(result);
});

test("return correct value", () => {
  expect(splitListToParts(new ListNode(1, new ListNode(2)), 2)).toEqual([
    new ListNode(1),
    new ListNode(2),
  ]);
});

test("return correct value", () => {
  expect(
    splitListToParts(new ListNode(1, new ListNode(2, new ListNode(3))), 3)
  ).toEqual([new ListNode(1), new ListNode(2), new ListNode(3)]);
});
