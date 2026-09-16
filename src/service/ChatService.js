import { GoogleGenAI } from "@google/genai";
import { getDados } from "../repository/DadosRepository.js";

const model = "gemini-3.5-flash";

export function getInitialMessage() {
	return {
		message: "Ola! Posso ajudar com duvidas sobre os participantes do portfolio. O que voce gostaria de saber?"
	};
}

export async function processMessage(message) {
	if (typeof message !== "string" || !message.trim()) {
		const error = new Error("A mensagem deve ser informada.");
		error.statusCode = 400;
		throw error;
	}

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

	return { message: response.text };
}
