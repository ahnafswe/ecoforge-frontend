import { Suspense } from "react";
import { Metadata } from "next";
import VerifyEmailContent from "@/components/auth/VerifyEmailContent";

export const metadata: Metadata = {
	title: "Verify Email | EcoForge",
	description: "Verify your account to get started.",
};

export default function VerifyEmailPage() {
	return (
		<div className="flex items-center justify-center px-4 py-12 md:py-20 lg:py-32">
			<div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-zinc-900/50 p-8 shadow-xl">
				<Suspense
					fallback={
						<div className="flex flex-col items-center justify-center space-y-4 py-10">
							<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
							<p className="text-sm font-medium text-foreground/60">Loading...</p>
						</div>
					}
				>
					<VerifyEmailContent />
				</Suspense>
			</div>
		</div>
	);
}
