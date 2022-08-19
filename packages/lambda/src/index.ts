export const handler = async (): Promise<void> => {
	const varFromWrapper = process.env['test_output'] ?? 'unset';
	console.log(`hello world: ${varFromWrapper}`);

	await Promise.resolve();
};

if (require.main === module) {
	void (async () => await handler())();
}
