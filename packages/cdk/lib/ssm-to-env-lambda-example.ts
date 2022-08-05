import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuLambdaFunction } from '@guardian/cdk/lib/constructs/lambda';
import type { App } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class SsmToEnvLambdaExample extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		new GuLambdaFunction(this, 'ssm-to-env-lambda-example', {
			app: 'ssm-to-env-lambda-example',
			fileName: 'ssm-to-env-lambda-example.zip',
			runtime: Runtime.NODEJS_16_X,
			handler: 'index.handler',
		});
	}
}
