const {
  insertGreatestCommonDivisors,
  getGCD,
} = require("./2807-med-insert-greatest-common-divisors-in-linked-list");
test("gcd", () => {
  expect(getGCD(1, 2)).toEqual(1);
  expect(getGCD(2, 3)).toEqual(1);
  expect(getGCD(2, 4)).toEqual(2);
  expect(getGCD(3, 9)).toEqual(3);
  expect(getGCD(12, 10)).toEqual(2);
});

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

test("result", () => {
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
              new ListNode(7, new ListNode(9, new ListNode(4, new ListNode(2))))
            )
          )
        )
      )
    )
  );

  const result = new ListNode(
    3,
    new ListNode(
      0,
      new ListNode(
        0,
        new ListNode(
          0,
          new ListNode(
            2,
            new ListNode(
              2,
              new ListNode(
                6,
                new ListNode(
                  2,
                  new ListNode(
                    8,
                    new ListNode(
                      1,
                      new ListNode(
                        1,
                        new ListNode(
                          1,
                          new ListNode(
                            7,
                            new ListNode(
                              1,
                              new ListNode(
                                9,
                                new ListNode(
                                  1,
                                  new ListNode(
                                    4,
                                    new ListNode(2, new ListNode(2))
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
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

  expect(insertGreatestCommonDivisors(head)).toEqual(result);
});
