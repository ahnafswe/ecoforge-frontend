import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign Up | EcoForge",
	description: "Create your EcoForge account to forge environmental solutions.",
};

export default function SignupPage() {
	return (
		<div className="flex items-center justify-center px-4 py-12 md:py-20 lg:py-24">
			<div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-zinc-900/50 p-6">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-extrabold">Sign Up</h1>
					<p className="mt-1 text-sm text-foreground/60">
						Create an account to start forging and voting on ideas.
					</p>
				</div>

				<SignupForm />

				<p className="mt-4 text-center text-sm text-foreground/60">
					Already have an account? Then{" "}
					<Link
						href="/login"
						className="font-semibold text-primary hover:underline"
					>
						login
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
