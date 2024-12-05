// Advent of Code: Day 5
function solvePartOne(input) {
  let result = 0;
  let [rules, updates] = parseInput(input);

  updates.forEach((u) => {
    const update = u.split(",").map(Number);
    if (isCorrectlyOrdredAsPerRules(update, rules)) {
      result += update[Math.floor(update.length / 2)];
    }
  });
  return result;
}

function parseInput(input) {
  const sections = input.trim().split("\n\n");
  const rules = sections[0]
    .trim()
    .split("\n")
    .map((rule) => rule.split("|").map(Number));
  let updates = sections[1].split("\n");
  return [rules, updates];
}

function isCorrectlyOrdredAsPerRules(update, rules) {
  for (let [before, after] of rules) {
    const beforeIndex = update.indexOf(before);
    const afterIndex = update.indexOf(after);
    if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex) {
      return false;
    }
  }
  return true;
}

function solvePartTwo(input) {
  const [rules, updates] = parseInput(input);
  let result = 0;
  updates.forEach((u) => {
    const update = u.split(",").map(Number);
    if (!isCorrectlyOrdredAsPerRules(update, rules)) {
      const fixedUpdate = fixUpdateAsPerRules(update, rules);
      result += fixedUpdate[Math.floor(fixedUpdate.length / 2)];
    }
  });
  return result;
}

function fixUpdateAsPerRules(update, rules) {
  const graph = new Map();
  const inDegree = new Map();
  update.forEach((page) => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });

  rules.forEach(([before, after]) => {
    if (update.includes(before) && update.includes(after)) {
      graph.get(before).push(after);
      inDegree.set(after, inDegree.get(after) + 1);
    }
  });

  const queue = [];
  inDegree.forEach((degree, page) => {
    if (degree === 0) queue.push(page);
  });

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    graph.get(current).forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return sorted;
}

module.exports = { solvePartOne, solvePartTwo };
