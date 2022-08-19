#!/bin/bash

# The path to the interpreter and all of the originally intended arguments
args=("$@")

prefix="${SSM_PATH_PREFIX}"

# Get architecture so we can choose the correct binary
arch=$(uname | tr '[:upper:]' '[:lower:]')

# Write env vars to temporary file
./nest-secrets-${arch}-amd64 --prefix ${prefix} > tmp.env

# Export all the values to env vars
set -o allexport
source tmp.env
set +o allexport

# Clean up
rm tmp.env

# Execute the next step
exec ${args[@]}


