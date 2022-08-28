command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
