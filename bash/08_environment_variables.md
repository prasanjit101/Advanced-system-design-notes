# Environment Variables

Environment variables are dynamic values that affect how processes behave on your system.

## env - Display Environment Variables

The `env` command shows all environment variables:

```bash
env                           # Display all environment variables
env | grep "PATH"             # Display specific variable
env | grep "^USER"            # Display variables starting with USER
```

## Common Environment Variables

- `PATH` - Directories where the shell looks for executables
- `HOME` - Current user's home directory
- `USER` - Current username
- `PWD` - Current working directory
- `SHELL` - Current shell being used
- `LANG` - System locale and language

## Accessing Variables

```bash
echo $PATH                    # Display value of PATH variable
echo $HOME                    # Display home directory
printenv PATH                 # Alternative way to display variable
```

## Setting Variables

```bash
# Temporary variable (only for current session)
MYVAR="hello"
echo $MYVAR                  # Output: hello

# Setting for current command only
VAR=value command            # Set variable just for this command
```

## export - Make Variables Available to Child Processes

The `export` command makes variables available to child processes:

```bash
export NEW_VAR="value"       # Export variable to child processes
export PATH=$PATH:/new/path  # Add directory to PATH variable
export -p                    # List all exported variables
```

## .bashrc and .bash_profile

These are special configuration files:

- `.bashrc` - Sourced for interactive non-login shells, typically used for aliases, functions, and environment variables
- `.bash_profile` - Sourced for login shells, typically used for environment setup

```bash
# Add to .bashrc to make changes persistent
echo 'export MY_VAR="value"' >> ~/.bashrc
source ~/.bashrc             # Reload the file after changes

# Add to .bash_profile for login shells
echo 'export PATH=$PATH:/new/path' >> ~/.bash_profile
```

## Managing Environment Variables

```bash
unset MYVAR                  # Remove a variable
export VAR=""                # Set variable to empty string
declare -x VAR="value"       # Alternative to export
```

Environment variables are essential for customizing your shell environment, configuring applications, and managing system behavior. Understanding how to use them effectively is key to efficient shell usage.