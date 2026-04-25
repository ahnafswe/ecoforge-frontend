"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TbArrowLeft } from "react-icons/tb";

export default function PageNotFound() {
	const router = useRouter();

	return (
		<div className="container max-lg:px-4 max-w-md min-h-screen mx-auto flex flex-col items-center justify-center gap-y-8">
			<img
				src="/images/page-not-found.png"
				alt="404 Page Not Found"
				className="w-full md:w-sm animate-float"
			/>

			<Button
				size="lg"
				onClick={() => router.push("/ideas")}
				className="h-12 px-6! gap-x-2 text-base font-semibold"
			>
				<TbArrowLeft className="size-5" />
				Back to Feed
			</Button>
		</div>
	);
}
