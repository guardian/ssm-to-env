import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SsmToEnvLambdaExample } from './ssm-to-env-lambda-example';

describe('The SsmToEnvLambdaExample stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new SsmToEnvLambdaExample(app, 'SsmToEnvLambdaExample', {
			stack: 'playground',
			stage: 'TEST',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});
