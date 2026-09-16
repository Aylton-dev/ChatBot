export class ChatRequest {
	constructor(message) {
		this.message = message.trim();
	}

	static fromBody(body) {
		const message = body?.message;

		if (typeof message !== "string" || !message.trim()) {
			const error = new Error("A mensagem deve ser informada.");
			error.statusCode = 400;
			throw error;
		}

		return new ChatRequest(message);
	}
}
