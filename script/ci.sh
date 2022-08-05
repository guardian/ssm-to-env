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

dist_dir="${ROOT_DIR}/packages/lambda/dist"

zip -FSjr "${dist_dir}/ssm-to-env-lambda-example.zip" "${dist_dir}/index.js"
