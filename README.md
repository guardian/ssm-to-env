# ssm-to-env-lambda-example

**WARNING:** This is a work in progress.

This repository is intended to test including a [lambda layer]() as a mechanism to pull configuration from from an SSM prefix and make it available as environment variables within the lambda.

This approach hopes to combine this [AWS layer example](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager), with some of the functionality of [guardian/nest-secrets](https://github.com/guardian/nest-secrets).

Lambda layers can be provisioned using [AWS CDK](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager/blob/b8360682026ab6f4c3f48e61a9e342a3fd3b3c06/cdk/lib/cdk-stack.ts#L44) by referencing a file uploaded to S3, or via other mechanisms similar to a usual lambda deployment.

Layers can be made accessible [between AWS accounts](https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html#permissions-resource-xaccountlayer).

Lambda layers can specify their compatible runtimes & architectures in their configuration. Scripts or executables in layers can be triggered using a [runtime wrapper script](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-modify.html#runtime-wrapper) by adding a [`AWS_LAMBDA_EXEC_WRAPPER` environment variable to your lambda configuration](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager/blob/b8360682026ab6f4c3f48e61a9e342a3fd3b3c06/cdk/lib/cdk-stack.ts#L64), containing the path to your wrapper script in the included layer.
