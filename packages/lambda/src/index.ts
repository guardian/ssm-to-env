export const handler = async (): Promise<void> => {
	const ssmPathPrefix = process.env['SSM_PATH_PREFIX'] ?? 'unset';
	if (ssmPathPrefix == 'unset') {
		throw new Error('SSM_PATH_PREFIX is unset, please provide a valid value!');
	}

	const unsetWarning = `The parameter 'test_output' is unset on SSM path ${ssmPathPrefix}`;
	const varFromWrapper = process.env['test_output'] ?? unsetWarning;

	console.log(`Reading 'test_output' parameter from ${ssmPathPrefix}`);
	console.log(`Found: ${varFromWrapper}`);

	await Promise.resolve();
};

if (require.main === module) {
	void (async () => await handler())();
}
