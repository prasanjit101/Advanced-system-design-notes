# Process Management

Process management is crucial for handling running programs and system resources effectively.

## ps - Show Running Processes

The `ps` command displays information about currently running processes:

```bash
ps                            # Show processes for current user
ps aux                        # Show all running processes (detailed)
ps -ef                        # Show all running processes (alternative format)
ps aux | grep "process_name"  # Find specific process
ps -p PID                     # Show specific process by PID
```

## top - Monitor System Processes

The `top` command provides a real-time view of running processes and system resources:

```bash
top                           # Show running processes and resource usage
# In top: 'q' to quit, 'k' to kill a process, 'u' to show specific user's processes
htop                          # Enhanced version of top (if installed)
```

## kill - Terminate Processes

The `kill` command sends signals to terminate or control processes:

```bash
kill PID                      # Terminate process by PID
kill -9 PID                   # Force kill process (SIGKILL)
kill -15 PID                  # Graceful termination (SIGTERM)
killall process_name          # Kill all processes with a specific name
pkill -f "pattern"            # Kill processes matching a pattern
```

## bg - Run Jobs in Background

The `bg` command resumes stopped jobs in the background:

```bash
# If a job is stopped (Ctrl+Z), resume it in background
bg                            # Continue stopped job in background
bg %1                         # Run specific job in background
```

## fg - Bring Jobs to Foreground

The `fg` command brings background jobs to the foreground:

```bash
jobs                          # List current jobs
fg                            # Bring most recent job to foreground
fg %1                         # Bring specific job to foreground
```

## Job Control Example

```bash
# Start a long-running process
long_running_command &
# This runs in background, you can continue using the shell

# Suspend a process running in foreground
Ctrl+Z                         # Suspends current process

# Resume suspended process in foreground
fg                            # Resume in foreground

# Resume suspended process in background
bg                            # Resume in background
```

Understanding process management is essential for efficiently managing system resources, troubleshooting issues, and running multiple tasks effectively.