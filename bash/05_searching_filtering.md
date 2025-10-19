# Searching and Filtering

## grep - Search for Patterns in Files

The `grep` command searches for patterns in one or more files:

```bash
grep "pattern" file.txt           # Search for "pattern" in file.txt
grep -i "pattern" file.txt        # Case-insensitive search
grep -r "pattern" directory/      # Recursive search in directory
grep -n "pattern" file.txt        # Show line numbers
grep -v "pattern" file.txt        # Show lines that don't match
grep -c "pattern" file.txt        # Count matching lines
```

## find - Find Files and Directories

The `find` command locates files and directories based on various criteria:

```bash
find /path/to/search -name "*.txt"        # Find all .txt files
find . -type f -name "*.log"              # Find only files with .log extension
find . -type d -name "backup*"            # Find directories starting with "backup"
find . -size +100M                        # Find files larger than 100MB
find . -mtime -7                          # Find files modified in last 7 days
find . -perm 755                          # Find files with specific permissions
```

## awk - Text Processing Tool

The `awk` command processes and analyzes text files:

```bash
awk '{print $1}' file.txt                 # Print first column of file
awk '/pattern/ {print $0}' file.txt       # Print lines containing pattern
awk 'NR==5 {print}' file.txt              # Print 5th line
awk '{sum+=$1} END {print sum}' file.txt  # Sum first column
```

## sed - Stream Editor

The `sed` command performs text transformations:

```bash
sed 's/old/new/' file.txt                 # Replace first occurrence of "old" with "new"
sed 's/old/new/g' file.txt                # Replace all occurrences ("g" flag)
sed '2d' file.txt                         # Delete line 2
sed '1,3d' file.txt                       # Delete lines 1-3
sed 'i\New line' file.txt                 # Insert new line before current line
sed 'a\New line' file.txt                 # Append new line after current line
```

These tools are powerful for searching through files, filtering content, and manipulating text data. They're essential for automation and data processing tasks.