#!/bin/bash
filepath: cell00/ex04/argv.sh
if [ $# -eq 0 ]; then
    echo "No arguments supplied."
else
    for i in 1 2 3
    do
        eval arg=${$i}
        if [ -n "$arg" ]; then
            echo "Argument $i: $arg"
        fi      
    done
fi