#!/bin/bash

# Check for challenge number argument
if [ -z "$1" ]; then
    echo "Usage: $0 <challenge_number>"
    exit 1
fi

CHALLENGE_NUMBER=$1
BASE_NAME="day$(printf "%02d" $CHALLENGE_NUMBER)"
JS_FILE="$BASE_NAME.js"
TEST_FILE="$BASE_NAME.test.js"

# Create JavaScript file
if [ ! -f "$JS_FILE" ]; then
    echo "// Advent of Code: Day $CHALLENGE_NUMBER" >"$JS_FILE"
    echo "function solve(input) {" >>"$JS_FILE"
    echo "  // Your solution here" >>"$JS_FILE"
    echo "}" >>"$JS_FILE"
    echo "module.exports = solve;" >>"$JS_FILE"
    echo "Created $JS_FILE"
else
    echo "$JS_FILE already exists."
fi

# Create test file
if [ ! -f "$TEST_FILE" ]; then
    echo "const solve = require('./$JS_FILE');" >"$TEST_FILE"
    echo "describe('Advent of Code - Day $CHALLENGE_NUMBER', () => {" >>"$TEST_FILE"
    echo "  test('Example Case', () => {" >>"$TEST_FILE"
    echo "    const input = '';" >>"$TEST_FILE"
    echo "    expect(solve(input)).toBe(/* expected output */);" >>"$TEST_FILE"
    echo "  });" >>"$TEST_FILE"
    echo "});" >>"$TEST_FILE"
    echo "Created $TEST_FILE"
else
    echo "$TEST_FILE already exists."
fi
