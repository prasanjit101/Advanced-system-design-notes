# Useful Utilities

This section covers essential command-line utilities for downloading files, transferring data, and packaging files.

## curl - Transfer Data from URLs

`curl` is a powerful tool for transferring data with URLs:

```bash
curl https://example.com                    # Get content from URL
curl -o file.html https://example.com      # Save output to file
curl -I https://example.com                # Get headers only
curl -X POST -d "data=value" https://example.com  # POST request with data
curl -u username:password https://example.com     # Authentication
```

## wget - Download Files

`wget` is designed for downloading files from the web:

```bash
wget https://example.com/file.zip          # Download file
wget -O newname.zip https://example.com/file.zip   # Download with new name
wget -c https://example.com/file.zip       # Continue partial downloads
wget -r https://example.com                # Recursive download (entire site)
wget -i filelist.txt                       # Download URLs from file
```

## ssh - Secure Shell

`ssh` provides secure remote login and command execution:

```bash
ssh username@hostname                     # Connect to remote host
ssh -p 2222 username@hostname             # Connect using specific port
ssh -i keyfile.pem username@hostname      # Connect with private key
ssh username@hostname "command"           # Execute command on remote host
scp file.txt username@hostname:/path/     # Copy files via SSH
```

## tar - Archive Files

`tar` creates and extracts compressed archives:

```bash
tar -cvf archive.tar file1 file2          # Create archive
tar -czvf archive.tar.gz file1 file2      # Create compressed archive (gzip)
tar -cjvf archive.tar.bz2 file1 file2     # Create compressed archive (bzip2)
tar -tvf archive.tar                      # List archive contents
tar -xvf archive.tar                      # Extract archive
tar -xzvf archive.tar.gz                  # Extract compressed archive
tar -xzvf archive.tar.gz -C /path/to/dir  # Extract to specific directory
```

## zip / unzip - Compress and Extract Zip Files

Zip utilities for working with .zip format:

```bash
zip archive.zip file1 file2               # Create zip archive
zip -r archive.zip directory/             # Create zip with directory contents
unzip archive.zip                         # Extract zip archive
unzip archive.zip -d /path/to/dir         # Extract to specific directory
unzip -l archive.zip                      # List contents without extracting
```

## Additional Useful Commands

```bash
# Network utilities
ping hostname                             # Test network connectivity
netstat -tuln                             # Show network connections
ss -tuln                                  # Modern alternative to netstat

# System monitoring
df -h                                     # Show disk space usage
free -h                                   # Show memory usage
iostat                                    # Show I/O statistics
vmstat                                    # Show virtual memory statistics

# Text processing
tr 'a-z' 'A-Z' < input.txt               # Convert to uppercase
sort file.txt                            # Sort lines alphabetically
uniq file.txt                            # Remove duplicate lines
wc file.txt                              # Count words, lines, characters
cut -d',' -f1,3 file.csv                # Extract specific columns from CSV
```

These utilities are essential for many common tasks like downloading resources, connecting to remote servers, archiving files, and monitoring system health. They greatly enhance your productivity in a Linux environment.