# wrapper-script

You can test this script by retrieving credentials from Janus and running:

```sh
SSM_PATH_PREFIX=/CODE/deploy/ssm-to-env \
AWS_PROFILE=deployTools \
./ssm-to-env.sh node ../packages/lambda/dist/index.js
```