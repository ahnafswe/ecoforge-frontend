"use client";

export function MembersStats({
	totalMembersCount,
	activeMembersCount,
	bannedMembersCount,
}: {
	totalMembersCount: number;
	activeMembersCount: number;
	bannedMembersCount: number;
}) {
	return (
		<div className="grid grid-cols-4 gap-4">
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 space-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Total Members</p>
				<h3 className="text-3xl font-semibold text-white">{totalMembersCount}</h3>
			</div>
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 space-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Active Members</p>
				<h3 className="text-3xl font-semibold text-green-400">{activeMembersCount}</h3>
			</div>
			<div className="rounded-xl bg-zinc-900/25 border border-zinc-800/75 p-5 space-y-1 hover:bg-zinc-900/50 transition-colors duration-200">
				<p className="font-medium text-zinc-300">Banned Members</p>
				<h3 className="text-3xl font-semibold text-red-400">{bannedMembersCount}</h3>
			</div>
		</div>
	);
}
