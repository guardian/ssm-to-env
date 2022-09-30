# wrapper-script

You can test this script by:

- Ensure you have downloaded the correct binary for your environment to this folder (on a new Apple laptop this will be `darwin-arm64`):
  
```
wget -O nest-secrets-darwin-arm6 https://github.com/guardian/nest-secrets/releases/download/v1.4.0/nest-secrets-darwin-arm64
chmod u+x nest-secrets-darwin-arm64
```

- Retrieve credentials from Janus, specify the correct SSM prefix, architecture and run:

```sh
SSM_PATH_PREFIX=/CODE/deploy/ssm-to-env \
AWS_PROFILE=deployTools \
arch=darwin-arm64 \
./ssm-to-env.sh node ../packages/lambda/dist/index.js
```