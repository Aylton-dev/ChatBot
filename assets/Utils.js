export function isValidString(value) {
	return typeof value === "string" && value.trim().length > 0;
}

export function normalizeString(value) {
	return value.trim();
}
