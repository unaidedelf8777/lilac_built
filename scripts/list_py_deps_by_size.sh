#!/bin/bash

# Lists the python dependencies, largest size first.
find .venv/ -maxdepth 4 -mindepth 4 -type d -exec du -hs {} \; | sort -hr
