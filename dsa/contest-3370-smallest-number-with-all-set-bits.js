/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function (n) {
  let num = 1;
  let enumerator = 1;
  while (n > num) {
    num += Math.pow(2, enumerator);
    enumerator++;
  }
  return num;
};

module.exports = { smallestNumber };
