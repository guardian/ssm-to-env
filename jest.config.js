module.exports = {
	verbose: true,
	testEnvironment: 'node',
	projects: [
		{
			displayName: 'cdk',
			transform: {
				'^.+\\.tsx?$': 'ts-jest',
			},
			testMatch: ['<rootDir>/packages/cdk/**/*.test.ts'],
		},
		{
			displayName: 'lambdas',
			transform: {
				'^.+\\.tsx?$': 'ts-jest',
			},
			testMatch: ['<rootDir>/packages/lambda/**/*.test.ts'],
		},
	],
};
