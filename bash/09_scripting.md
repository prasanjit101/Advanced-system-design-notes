# Scripting

Bash scripting allows you to automate tasks and create powerful command-line tools.

## Shebang

The shebang (`#!`) tells the system which interpreter to use to execute the script:

```bash
#!/bin/bash          # Use bash interpreter
#!/bin/sh            # Use sh interpreter
#!/usr/bin/env python # Use python (finds python in PATH)
```

## Creating and Running a Script

```bash
# 1. Create a script file
touch myscript.sh

# 2. Add shebang and content
#!/bin/bash
echo "Hello, World!"

# 3. Make executable
chmod +x myscript.sh

# 4. Run the script
./myscript.sh
```

## Variables

Variables store data for use in scripts:

```bash
#!/bin/bash
name="John"
age=25
echo "Name: $name, Age: $age"

# Special variables
echo "Script name: $0"    # Script name
echo "First argument: $1" # First command line argument
echo "Number of args: $#" # Number of arguments
echo "All args: $@"       # All arguments
```

## Conditionals

Use conditionals to make decisions in your script:

```bash
#!/bin/bash
if [ $1 -gt 18 ]; then
    echo "You are an adult"
elif [ $1 -eq 18 ]; then
    echo "You just became an adult"
else
    echo "You are a minor"
fi

# String comparison
if [ "$name" = "John" ]; then
    echo "Hello John!"
fi

# File tests
if [ -f "myfile.txt" ]; then
    echo "File exists"
fi

# Numerical comparison operators:
# -eq (equal), -ne (not equal), -lt (less than), -gt (greater than)
# -le (less or equal), -ge (greater or equal)
```

## Loops

Loops allow you to repeat actions:

```bash
#!/bin/bash
# For loop
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# While loop
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    counter=$((counter + 1))
done

# For loop with range
for i in {1..10}; do
    echo $i
done

# Loop through files
for file in *.txt; do
    echo "Processing $file"
done
```

## Functions

Functions help organize code and promote reusability:

```bash
#!/bin/bash
# Define function
greet() {
    echo "Hello, $1!"
}

# Call function
greet "John"

# Function with return value
add() {
    local sum=$(( $1 + $2 ))
    echo $sum
}

result=$(add 5 3)
echo "Result: $result"
```

## Complete Script Example

```bash
#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 <name> <age>"
    exit 1
}

# Check arguments
if [ $# -ne 2 ]; then
    usage
fi

name=$1
age=$2

# Validate age
if ! [[ "$age" =~ ^[0-9]+$ ]]; then
    echo "Error: Age must be a number"
    exit 1
fi

# Main functionality
echo "Hello $name, you are $age years old."

if [ $age -ge 18 ]; then
    echo "You are eligible to vote."
else
    echo "You are not eligible to vote yet."
fi
```

Bash scripting is a powerful way to automate repetitive tasks, create custom tools, and manage system operations efficiently.