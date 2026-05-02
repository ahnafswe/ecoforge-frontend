"use client";

import { getMyIdeas } from "@/services/ideas";
import { useQuery } from "@tanstack/react-query";
import { TbLoader2, TbAlertCircle } from "react-icons/tb";
import { MemberDashboardStats } from "./MemberDashboardStats";
import { MemberDashboardTopIdeas } from "./MemberDashboardTopIdeas";

export function MemberDashboardContentWrapper() {
	const {
		data: myIdeas,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["my-ideas"],
		queryFn: () => getMyIdeas(),
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
			<div className="flex h-100 w-full flex-col items-center justify-center text-destructive gap-2">
				<TbAlertCircle className="size-8" />
				<p>Embarrassingly, the ideas data failed to load. Try again?</p>
			</div>
		);
	}

	const totalIdeasCount = myIdeas!.length;
	const pendingIdeasCount = myIdeas!.filter((idea) => idea.status === "PENDING").length;

	const topIdeas = [...myIdeas!]
		.filter((idea) => idea.status === "APPROVED")
		.sort((a, b) => b.upvoteCount - a.upvoteCount)
		.slice(0, 4);

	return (
		<>
			<MemberDashboardStats
				totalIdeasCount={totalIdeasCount}
				pendingIdeasCount={pendingIdeasCount}
			/>

			<div className="space-y-6">
				<div className="space-y-1">
					<h3 className="text-2xl font-bold text-center">Your Hall of Fame</h3>
					<p className="text-zinc-400 text-center">
						Masterpieces that are made by you, loved by the community.
					</p>
				</div>

				<MemberDashboardTopIdeas ideas={topIdeas} />
			</div>
		</>
	);
}
