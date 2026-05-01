"use client";

import { getIdeas } from "@/services/ideas";
import { useQuery } from "@tanstack/react-query";
import { TbLoader2 } from "react-icons/tb";
import { PendingIdeasTable } from "./PendingIdeasTable";

export function ManageIdeasContentWrapper() {
	const {
		data: ideas,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["ideas"],
		queryFn: () => getIdeas(),
	});

	if (isLoading) {
		return (
			<div className="flex h-100 w-full items-center justify-center">
				<TbLoader2 className="size-10 animate-spin text-primary" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex h-100 w-full items-center justify-center text-destructive">
				<p>Embarrassingly, the ideas failed to load. Try again?</p>
			</div>
		);
	}

	if (!ideas?.length) {
		return (
			<div className="flex h-80 flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/25 p-8 text-center">
				<h4 className="text-xl font-semibold mb-2">
					Looks like an empty brain with no ideas
				</h4>
				<p className="text-zinc-400 max-w-md">
					You didn't post any masterpiece yet. Click the "Post Idea" button above to
					post the idea that's running in your mind.
				</p>
			</div>
		);
	}

	const pendingIdeas = ideas.filter((idea) => idea.status === "PENDING");
	const reviewedIdeas = ideas.filter(
		(idea) => idea.status === "APPROVED" || idea.status === "REJECTED",
	);

	return (
		<>
			{/* <MyIdeasStats
				totalIdeasCount={ideas.length}
				pendingIdeasCount={pendingIdeasCount}
				approvedIdeasCount={approvedIdeasCount}
				rejectedIdeasCount={rejectedIdeasCount}
			/> */}

			<div className="bg-zinc-900/25 border border-zinc-800/75 rounded-2xl">
				<div className="p-4 flex items-center justify-between">
					<p className="text-sm font-medium text-zinc-400">
						Showing <span className="text-zinc-200">{ideas.length}</span> ideas
					</p>
				</div>

				<div className="px-4 pb-4">
					<PendingIdeasTable ideas={pendingIdeas} />
					<PendingIdeasTable ideas={reviewedIdeas} />
				</div>
			</div>
		</>
	);
}
