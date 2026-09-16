import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { chatRateLimiter } from "../../configs/RateLimiter.js";
import {
	getChatInitialMessage,
	postChatMessage
} from "../controller/ChatEndpoint.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
	response.status(200).json({ status: "ok" });
});

app.get("/chat", chatRateLimiter, getChatInitialMessage);
app.post("/chat", chatRateLimiter, postChatMessage);

app.listen(port, () => {
	console.log(`Chatbot server running on port ${port}`);
});

export default app;
