# Infrastructure

This directory defines the components to be deployed to AWS.

See [`package.json`](./package.json) for a list of available scripts.

It contains:

- `ssm-to-env` [lambda layer](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-concepts.html#gettingstarted-concepts-layer) which can be used in your lambdas to automate pulling configuration from SSM.
- An example lambda to test the layer functionality locally and in AWS.
