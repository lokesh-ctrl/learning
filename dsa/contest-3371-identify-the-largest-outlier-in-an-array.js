/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  nums.sort((a, b) => b - a);
  console.log(nums);

  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        const candidateSum = nums[i];
        const potentialOutlier = nums[j];
        const remainingSum = totalSum - candidateSum - potentialOutlier;
        if (remainingSum === candidateSum) {
          return potentialOutlier;
        }
      }
    }
  }

  return -1;
};

module.exports = { getLargestOutlier };
