# Example lambda

This is an example lambda to demonstrate the behavior of the `ssm-to-env` layer and to test the wrapper script functionality locally.

It expects there to be a `test_output` parameter at the location in [AWS SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) specified by `SSM_PATH_PREFIX`.

For example if you specify `SSM_PATH_PREFIX=/CODE/deploy/ssm-to-env` it will try and read the parameter at location `/CODE/deploy/ssm-to-env/test_output`.

You can test this lambda by running the [wrapper script](../../wrapper-script/README.md).