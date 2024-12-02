const fs = require("fs");

function parseFileToArrays(filePath) {
  const data = fs.readFileSync(filePath, "utf8"); // Read the file synchronously
  const lines = data.trim().split("\n"); // Split content into lines

  const col1 = [];
  const col2 = [];

  lines.forEach((line) => {
    const [a, b] = line.trim().split("   ").map(Number); // Split line and convert to numbers
    col1.push(a);
    col2.push(b);
  });

  return [col1, col2];
}

module.exports = { parseFileToArrays };
