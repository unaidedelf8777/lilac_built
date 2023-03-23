#!/bin/bash

# Fail if any of the commands below fail.
set -e

# Activate the current py virtual env.
source $(poetry env info --path)/bin/activate

echo "Checking python types with mypy..."
mypy src

echo "Linting python with ruff..."
ruff src
