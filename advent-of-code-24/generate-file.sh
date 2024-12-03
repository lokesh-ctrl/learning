#!/bin/bash

# Check for challenge number argument
if [ -z "$1" ]; then
    echo "Usage: $0 <challenge_number>"
    exit 1
fi

CHALLENGE_NUMBER=$1
BASE_FOLDER="day$(printf "%02d" $CHALLENGE_NUMBER)"
JS_FILE="$BASE_FOLDER/day$(printf "%02d" $CHALLENGE_NUMBER).js"
TEST_FILE="$BASE_FOLDER/day$(printf "%02d" $CHALLENGE_NUMBER).test.js"
DATA_FILE="$BASE_FOLDER/day$(printf "%02d" $CHALLENGE_NUMBER).txt"

# Create the folder if it doesn't exist
if [ ! -d "$BASE_FOLDER" ]; then
    mkdir "$BASE_FOLDER"
    echo "Created folder $BASE_FOLDER"
else
    echo "Folder $BASE_FOLDER already exists."
fi

# Create JavaScript file
if [ ! -f "$JS_FILE" ]; then
    echo "// Advent of Code: Day $CHALLENGE_NUMBER" >"$JS_FILE"
    echo "function solvePartOne(input) {" >>"$JS_FILE"
    echo "  // Your solution here" >>"$JS_FILE"
    echo "}" >>"$JS_FILE"
    echo "" >>"$JS_FILE"
    echo "function solvePartTwo(input) {" >>"$JS_FILE"
    echo "  // Your solution here" >>"$JS_FILE"
    echo "}" >>"$JS_FILE"
    echo "" >>"$JS_FILE"
    echo "module.exports = { solvePartOne, solvePartTwo };" >>"$JS_FILE"
    echo "Created $JS_FILE"
else
    echo "$JS_FILE already exists."
fi

# Create test file
if [ ! -f "$TEST_FILE" ]; then
    echo "const { solvePartOne, solvePartTwo } = require('./day$(printf "%02d" $CHALLENGE_NUMBER)');" >"$TEST_FILE"
    echo "describe('Advent of Code - Day $CHALLENGE_NUMBER Part One', () => {" >>"$TEST_FILE"
    echo "  test('Example Case', () => {" >>"$TEST_FILE"
    echo "    const input = '';" >>"$TEST_FILE"
    echo "    expect(solvePartOne(input)).toBe(/* expected output */);" >>"$TEST_FILE"
    echo "  });" >>"$TEST_FILE"
    echo "});" >>"$TEST_FILE"
    echo "" >>"$TEST_FILE"
    echo "describe('Advent of Code - Day $CHALLENGE_NUMBER Part Two', () => {" >>"$TEST_FILE"
    echo "  test('Example Case', () => {" >>"$TEST_FILE"
    echo "    const input = '';" >>"$TEST_FILE"
    echo "    expect(solvePartTwo(input)).toBe(/* expected output */);" >>"$TEST_FILE"
    echo "  });" >>"$TEST_FILE"
    echo "});" >>"$TEST_FILE"
    echo "Created $TEST_FILE"
else
    echo "$TEST_FILE already exists."
fi

# Create data file
if [ ! -f "$DATA_FILE" ]; then
    touch "$DATA_FILE"
    echo "Created $DATA_FILE"
else
    echo "$DATA_FILE already exists."
fi