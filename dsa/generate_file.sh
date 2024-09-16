#!/bin/bash

# Check if a filename is provided
if [ -z "$1" ]; then
    echo "Please provide a filename."
    exit 1
fi

# Get the filename without extension
filename=$1
folder="."

# Check if a folder is provided as the second argument
if [ ! -z "$2" ]; then
    folder=$2
fi

# Create the folder if it doesn't exist
mkdir -p "$folder"

# Create the JavaScript file
js_file="$folder/$filename.js"
test_file="$folder/$filename.test.js"

if [ -f "$js_file" ]; then
    echo "$js_file already exists."
else
    echo "// $filename.js" >"$js_file"
    echo "Generated $js_file"
fi

# Create the corresponding test file
if [ -f "$test_file" ]; then
    echo "$test_file already exists."
else
    echo "const {} = require(\""./$filename"\");
test(\""return correct value\"", () => {})" >"$test_file"
    echo "Generated $test_file"
fi
