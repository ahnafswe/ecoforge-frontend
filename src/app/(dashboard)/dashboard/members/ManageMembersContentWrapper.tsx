"use client";

import { getMembers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { TbLoader2 } from "react-icons/tb";
import { MembersTable } from "./MembersTable";
import { MembersStats } from "./MembersStats";

export function ManageMembersContentWrapper() {
	const {
		data: members,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["members"],
		queryFn: getMembers,
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
				<p>Embarrassingly, the members failed to load. Try again?</p>
			</div>
		);
	}

	if (!members?.length) {
		return (
			<div className="flex h-80 flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/25 p-8 text-center">
				<h4 className="text-xl font-semibold mb-2">
					The member list is lighter than a feather
				</h4>
				<p className="text-zinc-400 max-w-md">
					It's quiet. A little too quiet... Some caffeine can be useful while the
					population incremental happens.
				</p>
			</div>
		);
	}

	const activeMembersCount = members.filter((member) => !member.isBanned).length;
	const bannedMembersCount = members.filter((member) => member.isBanned).length;

	return (
		<>
			<MembersStats
				totalMembersCount={members.length}
				activeMembersCount={activeMembersCount}
				bannedMembersCount={bannedMembersCount}
			/>

			<div className="bg-zinc-900/25 border border-zinc-800/75 rounded-2xl">
				<div className="p-4 flex items-center justify-between">
					<p className="text-sm font-medium text-zinc-400">
						Showing <span className="text-zinc-200">{members.length}</span> members
					</p>
				</div>

				<div className="px-4 pb-4">
					<MembersTable members={members} />
				</div>
			</div>
		</>
	);
}
