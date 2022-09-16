# wrapper-script

You can test this script by retrieving credentials from Janus and running:

```sh
SSM_PATH_PREFIX=/CODE/playground/ssm-to-env-lambda-example \
AWS_PROFILE=developerPlayground \
./ssm-to-env.sh node ../packages/lambda/dist/index.js
```