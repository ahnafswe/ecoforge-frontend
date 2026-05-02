"use client";

import { getIdeas, getIdeasByCategory, getIdeasTrend } from "@/services/ideas";
import { getMembers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { TbLoader2, TbAlertCircle } from "react-icons/tb";
import { AdminDashboardStats } from "./AdminDashboardStats";
import { AdminDashboardIdeasTrend } from "./AdminDashboardIdeasTrend";
import { AdminDashboardIdeasByCategory } from "./AdminDashboardIdeasByCategory";
import { IdeasTable } from "./ideas/IdeasTable";

export function AdminDashboardContentWrapper() {
	const {
		data: ideas,
		isLoading: isIdeasLoading,
		isError: isIdeasError,
	} = useQuery({
		queryKey: ["ideas"],
		queryFn: () => getIdeas(),
	});

	const {
		data: ideasTrend,
		isLoading: isIdeasTrendLoading,
		isError: isIdeasTrendError,
	} = useQuery({
		queryKey: ["ideas", "trend"],
		queryFn: () => getIdeasTrend(),
	});

	const {
		data: ideasByCategory,
		isLoading: isIdeasByCategoryLoading,
		isError: isIdeasByCategoryError,
	} = useQuery({
		queryKey: ["ideas", "category"],
		queryFn: () => getIdeasByCategory(),
	});

	const {
		data: members,
		isLoading: isMembersLoading,
		isError: isMembersError,
	} = useQuery({
		queryKey: ["members"],
		queryFn: () => getMembers(),
	});

	const isLoading =
		isIdeasLoading || isIdeasTrendLoading || isIdeasByCategoryLoading || isMembersLoading;
	const isError =
		isIdeasError || isIdeasTrendError || isIdeasByCategoryError || isMembersError;

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
				<p>Embarrassingly, the dashboard data failed to load. Try again?</p>
			</div>
		);
	}

	const totalIdeasCount = ideas!.length;
	const totalMembersCount = members!.length;

	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

	const newMembersCount = members!.filter(
		(member) => new Date(member.createdAt) >= sevenDaysAgo,
	).length;

	const newIdeasCount = ideas!.filter(
		(idea) => new Date(idea.createdAt) >= sevenDaysAgo,
	).length;

	const pendingIdeas = ideas!.filter((idea) => idea.status === "PENDING");
	const pendingIdeasRatio =
		totalIdeasCount > 0 ? (pendingIdeas.length / totalIdeasCount) * 100 : 0;

	const paidIdeas = ideas!.filter((idea) => idea.isPaid);
	const paidIdeasRatio = totalIdeasCount > 0 ? (paidIdeas.length / totalIdeasCount) * 100 : 0;

	return (
		<div className="space-y-6">
			<AdminDashboardStats
				totalMembersCount={totalMembersCount}
				newMembersCount={newMembersCount}
				totalIdeasCount={totalIdeasCount}
				newIdeasCount={newIdeasCount}
				pendingIdeasCount={pendingIdeas.length}
				pendingIdeasRatio={pendingIdeasRatio}
				paidIdeasCount={paidIdeas.length}
				paidIdeasRatio={paidIdeasRatio}
			/>

			<div className="flex items-start gap-6">
				<div className="w-2/3 bg-zinc-900/25 border border-zinc-800/75 rounded-2xl p-5">
					<h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
						Ideas over the last 7 days
					</h3>

					{!ideasTrend?.length ? (
						<div className="-mt-6 flex h-48 flex-col items-center justify-center text-center px-4">
							<h4 className="text-xl font-semibold mb-2">Velocity flatlined</h4>
							<p className="text-zinc-400 max-w-md">
								Your users are hibernating. Go poke them with a stick to wake up
								the beautiful charts.
							</p>
						</div>
					) : (
						<AdminDashboardIdeasTrend ideas={ideasTrend!} />
					)}
				</div>

				<div className="w-1/3 bg-zinc-900/25 border border-zinc-800/75 rounded-2xl p-5">
					<h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
						Ideas by Category
					</h3>

					{!ideasByCategory?.length ? (
						<div className="-mt-6 flex h-48 flex-col items-center justify-center text-center px-4">
							<h4 className="text-xl font-semibold mb-2">The uncharted void</h4>
							<p className="text-sm text-zinc-400 max-w-sm">
								Everything is currently filed under "Nothing". Create some
								categories before total chaos ensues.
							</p>
						</div>
					) : (
						<AdminDashboardIdeasByCategory ideas={ideasByCategory!} />
					)}
				</div>
			</div>

			<div className="bg-zinc-900/25 border border-zinc-800/75 rounded-2xl p-4">
				<h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
					Recent Pending Ideas
				</h3>

				{!pendingIdeas?.length ? (
					<div className="-mt-6 flex h-48 flex-col items-center justify-center text-center px-4">
						<h4 className="text-xl font-semibold mb-2">No ideas left to review</h4>
						<p className="text-zinc-400 max-w-md">
							You've either done your job perfectly, or everyone else forgot they
							had one. Enjoy the silence while it lasts.
						</p>
					</div>
				) : (
					<>
						{" "}
						<div className="mb-4 flex items-center justify-between">
							<p className="text-sm font-medium text-zinc-400">
								Showing{" "}
								<span className="text-zinc-200">{pendingIdeas.length}</span>{" "}
								<span className="text-yellow-400/80">pending</span> ideas
							</p>
						</div>
						<IdeasTable ideas={pendingIdeas} />
					</>
				)}
			</div>
		</div>
	);
}
