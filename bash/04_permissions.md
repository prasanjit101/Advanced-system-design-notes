# Permissions

Linux uses a permission system to control access to files and directories. Understanding permissions is crucial for system security and functionality.

## File Permission Basics

Each file has three types of permissions:
- `r` (read) - allows viewing the content of a file
- `w` (write) - allows modifying the content of a file
- `x` (execute) - allows running the file as a program

These permissions are applied to three categories:
- Owner: The user who owns the file
- Group: The group associated with the file
- Others: All other users

## chmod - Change File Permissions

The `chmod` command changes the permissions of files and directories:

```bash
# Using symbolic notation
chmod u+x file.txt        # Add execute permission for the owner
chmod u-x file.txt        # Remove execute permission for the owner
chmod g+w,o+r file.txt    # Add write for group, read for others
chmod a+x file.txt        # Add execute permission for all categories

# Using numeric notation (octal)
chmod 755 file.txt        # Owner: rwx, Group: r-x, Others: r-x
chmod 644 file.txt        # Owner: rw-, Group: r--, Others: r--
chmod 600 file.txt        # Owner: rw-, Group: ---, Others: ---
```

Common permission combinations:
- 755: Owner has full access, others can read and execute
- 644: Owner can read/write, others can read only
- 600: Only owner can read/write
- 700: Only owner has full access

## chown - Change File Ownership

The `chown` command changes the owner and group of files:

```bash
chown user file.txt              # Change owner to 'user'
chown user:group file.txt        # Change owner to 'user' and group to 'group'
chown :group file.txt            # Change group to 'group' only
chown -R user:group dir/         # Change ownership recursively for directory
```

To view file permissions, use `ls -l`:
```
-rwxr-xr-- 1 user group 1024 date filename
```
- The first character indicates file type (`-` for file, `d` for directory)
- Next 3 characters: owner permissions
- Next 3 characters: group permissions
- Last 3 characters: others permissions

Understanding permissions helps maintain system security and ensures proper access control to resources.