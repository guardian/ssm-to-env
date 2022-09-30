# ssm-to-env

This repository contains an [AWS Lambda layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) which pulls configuration from an SSM prefix and makes it available as environment variables within the lambda.

It does this by adding the [guardian/nest-secrets](https://github.com/guardian/nest-secrets) application to your lambda, and uses the `SSM_PATH_PREFIX` environment variable as the SSM prefix to look up.

## How to use

This layer can be used in lambdas to automate the process of configuring your lambdas by making [AWS SSM Parameters](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) at a specified prefix available as environment variables to your lambda.

This lambda layer is configured to be available to all Guardian AWS repositories so you only need specify its [ARN in your lambda configuration](packages/cdk/lib/ssm-to-env.ts).

The layer expects the following environment variables to be set in order to function:

```sh
AWS_LAMBDA_EXEC_WRAPPER: '/opt/ssm-to-env.sh',
SSM_PATH_PREFIX: `/CODE/my_stack/my_app`
```

`AWS_LAMBDA_EXEC_WRAPPER` is required [aws lambda configuration](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-modify.html) specifying what needs to be executed in the packaged layer.

## How to develop

There are instructions for [testing the wrapper script](wrapper-script/README.md), which will execute the [test lambda] using that script locally, this should reproduce what happens when a lambda layer is used in AWS by a consuming lambda.

To get started run (you'll need [node](https://nodejs.org/en/download/) and [nvm](https://github.com/nvm-sh/nvm)):

```sh
nvm use
npm install
npm run build
```

## Notes

This approach combines this [AWS layer example](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager), with some of the functionality of [guardian/nest-secrets](https://github.com/guardian/nest-secrets).

Lambda layers can be provisioned using [AWS CDK](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager/blob/b8360682026ab6f4c3f48e61a9e342a3fd3b3c06/cdk/lib/cdk-stack.ts#L44) by referencing a file uploaded to S3, or via other mechanisms similar to a usual lambda deployment.

Layers can be made accessible [between AWS accounts](https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html#permissions-resource-xaccountlayer).

Lambda layers can specify their compatible runtimes & architectures in their configuration. Scripts or executables in layers can be triggered using a [runtime wrapper script](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-modify.html#runtime-wrapper) by adding a [`AWS_LAMBDA_EXEC_WRAPPER` environment variable to your lambda configuration](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager/blob/b8360682026ab6f4c3f48e61a9e342a3fd3b3c06/cdk/lib/cdk-stack.ts#L64), containing the path to your wrapper script in the included layer.
