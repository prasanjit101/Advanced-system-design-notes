# Pipes and Redirection

Pipes and redirection are powerful concepts that allow you to connect commands and control where input comes from and output goes to.

## | (Pipe)

The pipe operator (`|`) takes the output of one command and uses it as the input for another command:

```bash
ls -l | grep ".txt"            # List files and filter only .txt files
cat file.txt | head -5         # Show first 5 lines of a file
ps aux | grep "python"         # Find processes containing "python"
ls -la | wc -l                 # Count total number of files/directories
cat largefile.txt | grep "error" | wc -l   # Count lines containing "error"
```

## > (Redirect Output)

The `>` operator redirects the output to a file, overwriting its contents:

```bash
ls > filelist.txt              # Save directory listing to file
echo "Hello World" > greeting.txt  # Write text to a file (overwrites existing content)
ls -la > /tmp/output.txt       # Redirect output to a temporary file
```

## >> (Append)

The `>>` operator redirects output to a file, appending to its existing content:

```bash
echo "First line" > file.txt   # Create file with first line
echo "Second line" >> file.txt # Append second line
echo "Third line" >> file.txt  # Append third line
```

## < (Input)

The `<` operator redirects a file to be used as input for a command:

```bash
sort < file.txt                # Sort contents of file.txt
grep "pattern" < input.txt     # Search for pattern in input.txt
```

## Common Redirection Examples

```bash
# Redirect both standard output and standard error
command > output.txt 2>&1      # Redirect both output and errors to file

# Discard output (send to null device)
command > /dev/null            # Suppress output

# Count lines containing a specific pattern
grep "pattern" file.txt | wc -l

# Chain multiple commands
cat file.txt | sort | uniq | head -10
```

Pipes and redirection allow you to create powerful command chains that can process and manipulate data efficiently. These concepts are fundamental to shell scripting and automation.