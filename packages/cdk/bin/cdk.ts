import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { SsmToEnv } from '../lib/ssm-to-env';

const app = new App();
new SsmToEnv(app, 'SsmToEnv-CODE', {
	stack: 'playground',
	stage: 'CODE',
	app: 'ssm-to-env',
	vary: `${Math.floor(new Date().getTime() / 1000)}`,
});
