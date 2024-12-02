#!/bin/bash

# Check if difficulty, problem number, and problem link are provided
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: $0 <difficulty> <problem_number> <problem_link>"
    exit 1
fi

# Extract inputs
difficulty=$1
problem_number=$2
problem_link=$3

# Ensure problem_number is always three digits (e.g., 001, 409)
formatted_number=$(printf "%03d" "$problem_number")

# Extract problem name from the URL
problem_name=$(echo "$problem_link" | awk -F '/' '{for (i=NF; i>0; i--) if ($i !~ /description/ && $i != "") {print $i; break}}')

# Generate file names
filename="${difficulty}-${formatted_number}-${problem_name}"
folder="."

# Create the folder if it doesn't exist
mkdir -p "$folder"

# Create the JavaScript file
js_file="$folder/$filename.js"
test_file="$folder/$filename.test.js"

if [ -f "$js_file" ]; then
    echo "$js_file already exists."
else
    echo "// $problem_link" > "$js_file"
    echo "module.exports = {};" >> "$js_file"
    echo "Generated $js_file"
fi

# Create the corresponding test file
if [ -f "$test_file" ]; then
    echo "$test_file already exists."
else
    echo "const {} = require(\"./$filename\");" > "$test_file"
    echo "test(\"return correct value\", () => {" >> "$test_file"
    echo "    expect().toEqual();" >> "$test_file"
    echo "});" >> "$test_file"
    echo "Generated $test_file"
fi
