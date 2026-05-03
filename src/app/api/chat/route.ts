import { convertToModelMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = streamText({
		model: google("gemini-2.5-flash"),
		system: "You are the official AI assistant for EcoForge. Your name is Ecova. You are helpful, concise, and deeply knowledgeable about sustainability and forging ideas. Keep it descriptive and intuitive.",
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
}
