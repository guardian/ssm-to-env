import {
	GuDistributionBucketParameter,
	GuStack,
	GuStringParameter,
} from '@guardian/cdk/lib/constructs/core';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuLambdaFunction } from '@guardian/cdk/lib/constructs/lambda';
import type { App } from 'aws-cdk-lib';
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';

interface SsmToEnvStackProps extends GuStackProps {
	app: string;
	vary: string;
}

export class SsmToEnv extends GuStack {
	constructor(scope: App, id: string, props: SsmToEnvStackProps) {
		super(scope, id, props);

		const bucket = Bucket.fromBucketName(
			this,
			`${id}-bucket`,
			GuDistributionBucketParameter.getInstance(this).valueAsString,
		);

		const paramPathBase = `/${this.stage}/${this.stack}/ssm-to-env`;
		const keyPrefix = `${this.stack}/${this.stage}/${props.app}`;

		const getSecretsLayer = new LayerVersion(this, 'get-secrets-layer', {
			code: Code.fromBucket(bucket, `${keyPrefix}/ssm-to-env.zip`),
			layerVersionName: `ssm-to-env-layer-${props.vary}`,
			description:
				'This layer is used to pull config from SSM and convert to environmental variables',
		});

		const organizationId = new GuStringParameter(this, 'organization-id', {
			default: `${paramPathBase}/organization-id`,
			description:
				'(From SSM) The AWS organization id with which to share this layer',
			fromSSM: true,
		});

		getSecretsLayer.addPermission('remote-account-grant', {
			accountId: '*',
			organizationId: organizationId.valueAsString,
		});

		const lambdaName = 'ssm-to-env-lambda-example';
		new GuLambdaFunction(this, lambdaName, {
			app: 'ssm-to-env',
			fileName: 'ssm-to-env-lambda-example.zip',
			runtime: Runtime.NODEJS_16_X,
			handler: 'index.handler',
			environment: {
				AWS_LAMBDA_EXEC_WRAPPER: '/opt/ssm-to-env.sh',
				SSM_PATH_PREFIX: `/${this.stage}/${this.stack}/${lambdaName}`,
			},
			layers: [getSecretsLayer],
		});
	}
}
