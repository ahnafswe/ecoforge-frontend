"use client";

import { getIdeas } from "@/services/ideas";
import { useQuery } from "@tanstack/react-query";
import { TbLoader2 } from "react-icons/tb";
import { IdeasTable } from "./IdeasTable";
import { IdeasStats } from "./IdeasStats";

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

	const approvedIdeasCount = ideas.filter((idea) => idea.status === "APPROVED").length;
	const pendingIdeas = ideas.filter((idea) => idea.status === "PENDING");
	const rejectedIdeas = ideas.filter((idea) => idea.status === "REJECTED");

	return (
		<>
			<IdeasStats
				totalIdeasCount={ideas.length}
				pendingIdeasCount={pendingIdeas.length}
				approvedIdeasCount={approvedIdeasCount}
				rejectedIdeasCount={rejectedIdeas.length}
			/>

			<div className="bg-zinc-900/25 border border-zinc-800/75 rounded-2xl">
				{!pendingIdeas.length ? (
					<div className="flex flex-col items-center justify-center h-48 text-center">
						<h4 className="text-xl font-semibold mb-2">No ideas left to review</h4>
						<p className="text-zinc-400 max-w-md">
							You've either done your job perfectly, or everyone else forgot they
							had one. Enjoy the silence while it lasts.
						</p>
					</div>
				) : (
					<>
						<div className="p-4 flex items-center justify-between">
							<p className="text-sm font-medium text-zinc-400">
								Showing{" "}
								<span className="text-zinc-200">{pendingIdeas.length}</span>{" "}
								<span className="text-yellow-400/80">pending</span> ideas
							</p>
						</div>

						<div className="px-4 pb-4">
							<IdeasTable ideas={pendingIdeas} />
						</div>
					</>
				)}
			</div>

			<div className="bg-zinc-900/25 border border-zinc-800/75 rounded-2xl">
				{!rejectedIdeas.length ? (
					<div className="flex flex-col items-center justify-center h-48 text-center">
						<h4 className="text-xl font-semibold mb-2">No rejected ideas... yet</h4>
						<p className="text-zinc-400 max-w-md">
							Shockingly, the community is keeping things professional and within
							the guidelines. Unprecedented.
						</p>
					</div>
				) : (
					<>
						<div className="p-4 flex items-center justify-between">
							<p className="text-sm font-medium text-zinc-400">
								Showing{" "}
								<span className="text-zinc-200">{rejectedIdeas.length}</span>{" "}
								<span className="text-red-400/80">rejected</span> ideas
							</p>
						</div>

						<div className="px-4 pb-4">
							<IdeasTable ideas={rejectedIdeas} />
						</div>
					</>
				)}
			</div>
		</>
	);
}
