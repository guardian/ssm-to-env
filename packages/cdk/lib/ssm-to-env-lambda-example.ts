import {
	GuDistributionBucketParameter,
	GuStack,
} from '@guardian/cdk/lib/constructs/core';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuLambdaFunction } from '@guardian/cdk/lib/constructs/lambda';
import type { App } from 'aws-cdk-lib';
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';

interface SsmToEnvLambdaStackProps extends GuStackProps {
	app: string;
}

export class SsmToEnvLambdaExample extends GuStack {
	constructor(scope: App, id: string, props: SsmToEnvLambdaStackProps) {
		super(scope, id, props);

		const bucket = Bucket.fromBucketName(
			this,
			`${id}-bucket`,
			GuDistributionBucketParameter.getInstance(this).valueAsString,
		);

		const keyPrefix = `${this.stack}/${this.stage}/${props.app}`;

		const getSecretsLayer = new LayerVersion(this, 'get-secrets-layer', {
			code: Code.fromBucket(
				bucket,
				`${keyPrefix}/ssm-to-env-lambda-layer-example.zip`,
			),
			description:
				'This layer is used to pull config from SSM and convert to environmental variables',
		});

		new GuLambdaFunction(this, 'ssm-to-env-lambda-example', {
			app: 'ssm-to-env-lambda-example',
			fileName: 'ssm-to-env-lambda-example.zip',
			runtime: Runtime.NODEJS_16_X,
			handler: 'index.handler',
			environment: {
				AWS_LAMBDA_EXEC_WRAPPER: '/opt/ssm-to-env.sh',
			},
			layers: [getSecretsLayer],
		});
	}
}
