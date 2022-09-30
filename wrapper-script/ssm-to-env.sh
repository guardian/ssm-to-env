#!/bin/bash

# The path to the interpreter and all of the originally intended arguments
args=("$@")

# Read prefix from env handed to lambda
prefix="${SSM_PATH_PREFIX}"

# The name of this script
name=$(basename $0 .sh)

# The full path to this script
fullPath="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

# Allow the arch to be handed in
arch=${arch:-linux-amd64}

# Write env vars to temporary file
${fullPath}/nest-secrets-${arch} --prefix ${prefix} > /tmp/${name}.env

# Export all the values to env vars
set -o allexport
source /tmp/${name}.env
set +o allexport

# Clean up
rm /tmp/${name}.env

# Execute the next step
exec ${args[@]}
