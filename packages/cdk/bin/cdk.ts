import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { SsmToEnv } from '../lib/ssm-to-env';

const app = new App();
const stages = ['CODE', 'PROD'];

// This value is used to ensure re-deployment of the lambda layer on each build
const vary = `${Math.floor(new Date().getTime() / 1000)}`;

stages.map((stage: string) => {
	new SsmToEnv(app, `SsmToEnv-${stage}`, {
		stack: 'deploy',
		stage: stage,
		app: 'ssm-to-env',
		vary: vary,
	});
});
