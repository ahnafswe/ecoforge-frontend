"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

export default function Newsletter() {
	return (
		<section className="border-t border-white/5 bg-zinc-900/25 px-4 py-16">
			<div className="container mx-auto max-w-xl text-center">
				<h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">
					Stay in the loop
				</h2>

				<p className="mt-3 text-foreground/70">
					Get a weekly digest of the trending environmental ideas and exclusive
					premium ideas delivered straight to your inbox.
				</p>

				<form
					className="mt-6 flex flex-col justify-center gap-2 sm:flex-row"
					onSubmit={(e) => e.preventDefault()}
				>
					<Input
						type="email"
						placeholder="Enter your email"
						className="rounded-sm"
					/>
					<Button
						size="lg"
						type="submit"
						className="shrink-0 px-6 font-semibold h-9 rounded-sm"
					>
						Subscribe
					</Button>
				</form>

				<p className="mt-6 text-xs font-medium text-foreground/40">
					No spam. Just pure, sustainable innovation. Unsubscribe anytime.
				</p>
			</div>
		</section>
	);
}
