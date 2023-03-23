#!/bin/bash

# Fail if any of the commands below fail.
set -e

cd server && npm run test && cd ..
