const { LRUCache } = require("./medium-146-lru-cache-using-double-linked-list");
test("return correct value", () => {
  const lruCache = new LRUCache(2);
  expect(lruCache.put(1, 1)).toEqual(null);
  expect(lruCache.put(2, 2)).toEqual(null);
  expect(lruCache.get(1)).toEqual(1);
  expect(lruCache.put(3, 3)).toEqual(null);
  expect(lruCache.get(2)).toEqual(-1);
  expect(lruCache.put(4, 4)).toEqual(null);
  expect(lruCache.get(1)).toEqual(-1);
  expect(lruCache.get(3)).toEqual(3);
  expect(lruCache.get(4)).toEqual(4);
});

test("return correct value", () => {
  const lruCache = new LRUCache(1);
  expect(lruCache.put(2, 1)).toEqual(null);
  expect(lruCache.get(1)).toEqual(-1);
  expect(lruCache.get(2)).toEqual(1);
});
