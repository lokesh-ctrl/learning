function solvePartOne(input) {
  let result = 0;
  let inputs = parseInput(input);
  inputs.forEach((input) => {
    if (checkValidInput(input[0], input[1], ["+", "*"])) {
      result += input[0];
    }
  });
  return result;
}

function parseInput(input) {
  return input.split("\n").map((line) => [
    parseInt(line.trim().split(":")[0]),
    line
      .trim()
      .split(":")[1]
      .trim()
      .split(" ")
      .map((num) => parseInt(num)),
  ]);
}

function checkValidInput(testValue, numbers, operators) {
  // Helper function to evaluate an expression left-to-right
  const evaluate = (nums, ops) => {
    let result = nums[0];
    for (let i = 0; i < ops.length; i++) {
      switch (ops[i]) {
        case "+":
          result += nums[i + 1];
          break;
        case "*":
          result *= nums[i + 1];
          break;
        case "||":
          result = parseInt(result + "" + nums[i + 1]);
          break;
      }
    }
    return result;
  };

  // Recursive function to generate all operator combinations
  const generateOperators = (nums, currentOps = []) => {
    if (currentOps.length === nums.length - 1) {
      return [currentOps];
    }

    let results = [];
    for (const op of operators) {
      results = results.concat(generateOperators(nums, [...currentOps, op]));
    }
    return results;
  };

  // Generate all possible operator combinations
  const allCombinations = generateOperators(numbers);

  // Check each combination
  for (const combination of allCombinations) {
    if (evaluate(numbers, combination) === testValue) {
      return true;
    }
  }

  return false;
}

function solvePartTwo(input) {
  let result = 0;
  let inputs = parseInput(input);
  inputs.forEach((input) => {
    if (checkValidInput(input[0], input[1], ["+", "*", "||"])) {
      result += input[0];
    }
  });
  return result;
}

module.exports = { solvePartOne, solvePartTwo };
