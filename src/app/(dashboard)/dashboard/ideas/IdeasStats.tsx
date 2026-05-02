"use client";

export function IdeasStats({
	totalIdeasCount,
	pendingIdeasCount,
	approvedIdeasCount,
	rejectedIdeasCount,
}: {
	totalIdeasCount: number;
	pendingIdeasCount: number;
	approvedIdeasCount: number;
	rejectedIdeasCount: number;
}) {
	return (
		<div className="grid grid-cols-4 gap-4">
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 space-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Total Ideas</p>
				<h3 className="text-3xl font-semibold text-white">{totalIdeasCount}</h3>
			</div>
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 space-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Pending Ideas</p>
				<h3 className="text-3xl font-semibold text-yellow-400">{pendingIdeasCount}</h3>
			</div>
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 space-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Approved Ideas</p>
				<h3 className="text-3xl font-semibold text-green-400">{approvedIdeasCount}</h3>
			</div>
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 space-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Rejected Ideas</p>
				<h3 className="text-3xl font-semibold text-red-400">{rejectedIdeasCount}</h3>
			</div>
		</div>
	);
}
