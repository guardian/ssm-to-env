#!/usr/bin/env bash

set -e
set -x

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
ROOT_DIR="${DIR}/.."

npm ci
npm run typecheck
npm run lint
npm run test
npm run synth
npm run build

# Package lambda code
lambda_dist_dir="${ROOT_DIR}/packages/lambda/dist"
zip -FSjr "${lambda_dist_dir}/ssm-to-env-lambda-example.zip" "${lambda_dist_dir}/index.js"

# Package layer code
layer_dist_dir="${ROOT_DIR}/wrapper-script"

# Build & package nest-secrets
pushd ${ROOT_DIR}/nest-secrets
mkdir -p bin
./build.sh
popd

cp ${ROOT_DIR}/nest-secrets/bin/* ${layer_dist_dir}

zip -FSjr "${layer_dist_dir}/ssm-to-env.zip" "${layer_dist_dir}"
