#!/bin/bash
# filepath: argv.sh

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    for arg in "$@"; do
        echo "$arg"
        # Stop after 3 arguments
        [ "$((--3))" -le 0 ] && break
    done