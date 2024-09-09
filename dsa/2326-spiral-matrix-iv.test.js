const { spiralMatrix } = require("./2326-spiral-matrix-iv");
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}
test("return correct value", () => {
  const head = new ListNode(
    3,
    new ListNode(
      0,
      new ListNode(
        2,
        new ListNode(
          6,
          new ListNode(
            8,
            new ListNode(
              1,
              new ListNode(
                7,
                new ListNode(
                  9,
                  new ListNode(
                    4,
                    new ListNode(
                      2,
                      new ListNode(5, new ListNode(5, new ListNode(0)))
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
  expect(spiralMatrix(3, 5, head)).toEqual([
    [3, 0, 2, 6, 8],
    [5, 0, -1, -1, 1],
    [5, 2, 4, 9, 7],
  ]);
});
