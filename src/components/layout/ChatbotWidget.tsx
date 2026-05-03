"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { TbMessageChatbot, TbX, TbSend, TbLoader2 } from "react-icons/tb";

export function ChatbotWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");

	const { messages, sendMessage, status } = useChat();

	const isProcessing = status === "submitted" || status === "streaming";

	const handleFormSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		if (input.trim() && status === "ready") {
			sendMessage({ text: input });
			setInput("");
		}
	};

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className="flex size-12 items-center justify-center rounded-lg bg-primary backdrop-blur text-lime-800 hover:bg-primary/85 transition-colors"
				>
					<TbMessageChatbot className="size-7" />
				</button>
			)}

			{isOpen && (
				<div className="flex h-125 w-96 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0f] shadow-2xl">
					<div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
						<div className="flex items-center gap-2">
							<div className="size-3 rounded-full bg-lime-500" />
							<h3 className="font-semibold">Ecova</h3>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="text-zinc-400 hover:text-white"
						>
							<TbX className="size-5" />
						</button>
					</div>

					<div className="flex-1 overflow-y-auto p-4 space-y-3">
						{messages.map((m) => (
							<div
								key={m.id}
								className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${
										m.role === "user"
											? "bg-zinc-800 rounded-br-none"
											: "bg-zinc-900 rounded-bl-none"
									}`}
								>
									{m.parts.map((part, i) =>
										part.type === "text" ? (
											<span key={i}>{part.text}</span>
										) : null,
									)}
								</div>
							</div>
						))}

						{isProcessing && (
							<div className="flex justify-start items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest px-2">
								<TbLoader2 className="animate-spin size-3" />
								{status === "submitted" ? "Connecting" : "Streaming"}
							</div>
						)}
					</div>

					<form
						onSubmit={handleFormSubmit}
						className="border-t border-zinc-800 px-4 py-3 bg-zinc-900/30"
					>
						<div className="flex gap-2">
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Ask me anything..."
								className="flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
							/>
							<button
								type="submit"
								disabled={isProcessing || !input.trim()}
								className="flex size-9 items-center justify-center rounded-sm bg-primary text-lime-800 disabled:opacity-50 transition-opacity"
							>
								<TbSend className="size-5" />
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
