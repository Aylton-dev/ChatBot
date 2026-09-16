import {
	getInitialMessage,
	processMessage
} from "../service/ChatService.js";
import { ChatRequest } from "../models/ChatRequest.js";

export function getChatInitialMessage(_request, response) {
	response.status(200).json(getInitialMessage());
}

export async function postChatMessage(request, response) {
	try {
		const chatRequest = ChatRequest.fromBody(request.body);
		const result = await processMessage(chatRequest);
		response.status(200).json(result);
	} catch (error) {
		const statusCode = error.statusCode || 500;
		response.status(statusCode).json({ error: error.message });
	}
}
