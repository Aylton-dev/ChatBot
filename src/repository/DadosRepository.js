import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.resolve(repositoryDirectory, "../../data/Dados.json");

export async function getDados() {
	const fileContent = await readFile(dataFilePath, "utf-8");

	if (!fileContent.trim()) {
		return [];
	}

	try {
		return JSON.parse(fileContent);
	} catch {
		throw new Error("O arquivo data/Dados.json possui um JSON invalido.");
	}
}
