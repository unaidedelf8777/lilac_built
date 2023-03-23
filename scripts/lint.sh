#!/bin/bash
set -e # Fail if any of the commands below fail.

./scripts/lint_py.sh
./scripts/lint_ts.sh
