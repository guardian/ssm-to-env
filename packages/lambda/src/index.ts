export const handler = async (): Promise<void> => {
	const varFromWrapper = process.env['TEST_VARIABLE'] ?? 'unset';
	console.log(`hello world: ${varFromWrapper}`);

	await Promise.resolve();
};

if (require.main === module) {
	void (async () => await handler())();
}
