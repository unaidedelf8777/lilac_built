#!/bin/bash
set -e # Fail if any of the commands below fail.

cd server && ./install_cloud_sql_proxy.sh && cd ..

npm install
cd src/web && npm install && cd ../..
