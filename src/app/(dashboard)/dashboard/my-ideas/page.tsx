import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { MyIdeasTable } from "./MyIdeasTable";

export default async function MyIdeasPage() {
	const sessionData = await getServerSession();

	if (!sessionData?.user) redirect("/login");

	if (sessionData.user.role !== "MEMBER") redirect("/dashboard");

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight leading-none">My Ideas</h1>
				<p className="text-zinc-400 mt-2">
					Manage your submitted ideas and check their approval status.
				</p>
			</div>

			<div className="bg-zinc-900/25 border border-zinc-800/75 rounded-2xl p-2">
				<MyIdeasTable />
			</div>
		</div>
	);
}
