"use client";

export function MemberDashboardStats({
	totalIdeasCount,
	pendingIdeasCount,
}: {
	totalIdeasCount: number;
	pendingIdeasCount: number;
}) {
	return (
		<div className="grid grid-cols-4 gap-4">
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 flex flex-col justify-center gap-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Total Ideas</p>
				<h3 className="text-3xl font-bold text-white">{totalIdeasCount}</h3>
			</div>

			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 flex flex-col justify-center gap-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Pending Ideas</p>
				<h3 className="text-3xl font-bold text-white">{pendingIdeasCount}</h3>
			</div>
		</div>
	);
}
