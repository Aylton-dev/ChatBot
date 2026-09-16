import { GoogleGenAI } from "@google/genai";
import { getDados } from "../repository/DadosRepository.js";
import { ChatResponse } from "../models/ChatResponse.js";

const model = "gemini-3.5-flash";

export function getInitialMessage() {
	return new ChatResponse(
		"Ola! Posso ajudar com duvidas sobre os participantes do portfolio. O que voce gostaria de saber?"
	);
}

export async function processMessage(chatRequest) {
	const message = chatRequest.message;
	const dados = await getDados();
	const dadosDoPortfolio = JSON.stringify(dados, null, 2);

	const prompt = [
		"Voce e o assistente virtual de um portfolio de alunos.",
		"Responda de forma objetiva e cordial.",
		"Use somente informacoes fornecidas pelo portfolio.",
		"Se a informacao nao estiver disponivel, apenas informe que nao possui essa informacao.",
		"Nao invente dados sobre os participantes.",
		"Dados completos do portfolio:",
		dadosDoPortfolio,
		`Duvida do usuario: ${message.trim()}`
	].join("\n");

	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
	const response = await ai.models.generateContent({
		model,
		contents: prompt
	});

	return new ChatResponse(response.text);
}
