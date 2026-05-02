"use client";

export function AdminDashboardStats({
	totalMembersCount,
	newMembersCount,
	totalIdeasCount,
	newIdeasCount,
	pendingIdeasCount,
	pendingIdeasRatio,
	paidIdeasCount,
	paidIdeasRatio,
}: {
	totalMembersCount: number;
	newMembersCount: number;
	totalIdeasCount: number;
	newIdeasCount: number;
	pendingIdeasCount: number;
	pendingIdeasRatio: number;
	paidIdeasCount: number;
	paidIdeasRatio: number;
}) {
	return (
		<div className="grid grid-cols-4 gap-4">
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 flex flex-col justify-center gap-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Total Members</p>
				<h3 className="text-3xl font-bold text-white">{totalMembersCount}</h3>
				<p className="text-sm text-zinc-400">+{newMembersCount} this week</p>
			</div>

			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 flex flex-col justify-center gap-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Total Ideas</p>
				<h3 className="text-3xl font-bold text-white">{totalIdeasCount}</h3>
				<p className="text-sm text-zinc-400">+{newIdeasCount} this week</p>
			</div>

			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 flex flex-col justify-center gap-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Pending Reviews</p>
				<h3 className="text-3xl font-bold text-white">{pendingIdeasCount}</h3>
				<p className="text-sm text-zinc-400">
					{pendingIdeasRatio.toFixed(1)}% of total ideas
				</p>
			</div>

			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 flex flex-col justify-center gap-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Premium Ideas</p>
				<h3 className="text-3xl font-bold text-white">{paidIdeasCount}</h3>
				<p className="text-sm text-zinc-400">
					{paidIdeasRatio.toFixed(1)}% of total ideas
				</p>
			</div>
		</div>
	);
}
