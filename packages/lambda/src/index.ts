export const handler = async (): Promise<void> => {
	console.log('hello world');

	await Promise.resolve();
};

if (require.main === module) {
	void (async () => await handler())();
}
