#!/bin/bash

# Fail if any of the commands below fail.
set -e

# Activate the current py virtual env.
source $(poetry env info --path)/bin/activate

pytest --cov --cov-report html:py_coverage_html/

open py_coverage_html/index.html
