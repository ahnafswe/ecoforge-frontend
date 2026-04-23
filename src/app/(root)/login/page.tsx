import Link from "next/link";
import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
	title: "Login | EcoForge",
	description: "Access your account.",
};

export default function LoginPage() {
	return (
		<div className="flex items-center justify-center max-lg:px-4 py-12 md:py-20 lg:py-24">
			<div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-zinc-900/50 p-6">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-extrabold">Log In</h1>
					<p className="mt-1 text-sm text-foreground/60">
						Log in to your account to continue.
					</p>
				</div>

				<LoginForm />

				<p className="mt-4 text-center text-sm text-foreground/60">
					Don&apos;t have an account? Then{" "}
					<Link
						href="/signup"
						className="font-semibold text-primary hover:underline"
					>
						sign up
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
