# File System Navigation

## pwd - Print Working Directory

The `pwd` command shows the current directory path you're in:

```bash
pwd
```

## ls - List Directory Contents

The `ls` command lists files and directories in the current location:

```bash
ls          # List files in current directory
ls -l       # List with detailed information
ls -a       # List all files (including hidden ones)
ls -la      # List all files with details
```

## cd - Change Directory

The `cd` command allows you to navigate to different directories:

```bash
cd /home/user      # Navigate to specific directory
cd ..              # Move up one directory level
cd ~               # Go to home directory
cd -               # Go back to previous directory
```

## tree - Show Directory Tree

The `tree` command shows a visual representation of the directory structure:

```bash
tree             # Show tree of current directory
tree -d          # Show only directories (not files)
```

## mkdir - Make Directory

The `mkdir` command creates new directories:

```bash
mkdir myfolder          # Create a single directory
mkdir dir1 dir2 dir3    # Create multiple directories at once
mkdir -p path/to/dir    # Create nested directories (intermediate directories if they don't exist)
```

## rmdir - Remove Directory

The `rmdir` command removes empty directories:

```bash
rmdir myfolder          # Remove an empty directory
rmdir dir1 dir2         # Remove multiple empty directories
```

Understanding file system navigation is crucial for efficiently operating in the command line environment. Practice these commands until they become second nature.