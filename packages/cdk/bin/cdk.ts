import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { SsmToEnv } from '../lib/ssm-to-env';

const app = new App();
const stages = ['CODE', 'PROD'];

stages.map((stage: string) => {
	new SsmToEnv(app, `SsmToEnv-${stage}`, {
		stack: 'deploy',
		stage: stage,
		app: 'ssm-to-env',
	});
});
