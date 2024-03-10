export const dictionary: any = {
	boolean: { nullValue: false, handler: Boolean },
	number: { nullValue: 0, handler: Number },
	bigint: { nullValue: 0n, handler: BigInt },
	string: { nullValue: "", handler: String },
	array: { nullValue: [], handler: JSON.parse },
	object: { nullValue: {}, handler: JSON.parse },
};

export function cast(type: string, value: string): unknown {
	if (!(type in dictionary)) return null;

	try {
		return dictionary[type].handler(value);
	} catch {
		return dictionary[type].nullValue;
	}
}
