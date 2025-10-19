# File and Directory Operations

## touch - Create/Update Files

The `touch` command creates new empty files or updates the timestamp of existing files:

```bash
touch newfile.txt        # Create a new empty file
touch file1 file2        # Create multiple files
```

## cat - View File Contents

The `cat` command displays the contents of a file:

```bash
cat file.txt            # Display content of file.txt
cat file1 file2         # Display contents of multiple files
cat > newfile.txt       # Create/overwrite file with input from keyboard
cat >> existing.txt     # Append to an existing file
```

## cp - Copy Files/Directories

The `cp` command copies files and directories:

```bash
cp file1.txt file2.txt      # Copy file1 to file2
cp -r dir1 dir2             # Copy directory recursively
cp *.txt backup/            # Copy all .txt files to backup directory
```

## mv - Move/Rename Files/Directories

The `mv` command moves files/directories or renames them:

```bash
mv oldname.txt newname.txt  # Rename a file
mv file.txt dir/            # Move file to directory
mv dir1 dir2                # Rename directory or move dir1 to dir2
```

## rm - Remove Files/Directories

The `rm` command deletes files and directories:

```bash
rm file.txt                 # Remove a file
rm -r dir/                  # Remove directory and its contents
rm -f file.txt              # Force remove (no confirmation)
rm *.txt                    # Remove all .txt files
```

## head - View First Lines of a File

The `head` command shows the beginning of a file:

```bash
head file.txt               # Show first 10 lines
head -n 5 file.txt          # Show first 5 lines
```

## tail - View Last Lines of a File

The `tail` command shows the end of a file:

```bash
tail file.txt               # Show last 10 lines
tail -n 5 file.txt          # Show last 5 lines
tail -f file.txt            # Follow file as it grows (useful for logs)
```

## less - View Large Files

The `less` command allows you to scroll through large files:

```bash
less largefile.txt          # View file with scrolling capability
# Use arrow keys to navigate, 'q' to quit, '/' for search
```

## more - View Files Page by Page

The `more` command displays files page by page:

```bash
more largefile.txt          # View file page by page
# Use spacebar to go to next page, 'q' to quit
```

These commands are fundamental for managing files and directories in Linux. Practice them regularly to become proficient in file manipulation.