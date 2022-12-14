import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SsmToEnv } from './ssm-to-env';

describe('The SsmToEnv stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new SsmToEnv(app, 'SsmToEnv', {
			stack: 'deploy',
			stage: 'TEST',
			app: 'ssm-to-env',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});
