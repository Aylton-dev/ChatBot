import {
	isValidString,
	normalizeString
} from "../../assets/Utils.js";

export class ChatRequest {
	constructor(message) {
		this.message = normalizeString(message);
	}

	static fromBody(body) {
		const message = body?.message;

		if (!isValidString(message)) {
			const error = new Error("A mensagem deve ser informada.");
			error.statusCode = 400;
			throw error;
		}

		return new ChatRequest(message);
	}
}
