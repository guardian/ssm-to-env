#!/usr/bin/env bash

set -e
set -x

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
ROOT_DIR="${DIR}/.."
ARCH="linux-amd64"

RELEASE_VERSION=1.4.0
GH_BASE_PATH="https://github.com/guardian/nest-secrets/releases/download"
BINARY_LOCATION="${GH_BASE_PATH}/v${RELEASE_VERSION}/nest-secrets-${ARCH}"

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

# Download binaries from nest-secrets GitHub release
pushd ${layer_dist_dir}
    wget $BINARY_LOCATION
popd

zip -FSjr "${layer_dist_dir}/ssm-to-env.zip" "${layer_dist_dir}"
