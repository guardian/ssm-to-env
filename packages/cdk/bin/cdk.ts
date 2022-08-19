import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { SsmToEnvLambdaExample } from '../lib/ssm-to-env-lambda-example';

const app = new App();
new SsmToEnvLambdaExample(app, 'SsmToEnvLambdaExample-CODE', {
	stack: 'playground',
	stage: 'CODE',
	app: 'ssm-to-env-lambda-example',
	vary: `${Math.floor(new Date().getTime() / 1000)}`,
});
