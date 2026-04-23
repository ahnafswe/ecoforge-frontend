"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbMail, TbArrowRight, TbAlertCircle } from "react-icons/tb";

export function VerifyEmailContent() {
	const searchParams = useSearchParams();
	const status = searchParams.get("status");

	if (status === "pending") {
		return (
			<div className="flex flex-col items-center text-center">
				<div className="mb-2 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
					<TbMail className="size-8" />
				</div>

				<h1 className="text-2xl font-bold tracking-tight">Check your email inbox</h1>

				<p className="mt-2 text-foreground/70">
					We just sent a verification link to your email.{" "}
					<br className="hidden sm:block" />
					Click the link to activate your account.
				</p>

				<div className="mt-4 w-full rounded-lg bg-zinc-900/75 p-3 text-sm text-foreground/60">
					<p>
						Couldn't find it? Check your
						<br />
						spam or promotions folder.
					</p>
				</div>

				<Link
					href="/login"
					className="mt-6 w-full"
					tabIndex={-1}
				>
					<Button
						variant="outline"
						className="w-full group h-10"
					>
						Back to Login
						<TbArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center text-center">
			<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
				<TbAlertCircle className="h-10 w-10" />
			</div>

			<h1 className="text-3xl font-extrabold tracking-tight">Verification Issue</h1>

			<p className="mt-4 text-foreground/70">
				We couldn't verify your session or the link has expired.
			</p>

			<Link
				href="/login"
				className="mt-8 w-full"
				tabIndex={-1}
			>
				<Button className="w-full">Return to Login</Button>
			</Link>
		</div>
	);
}
