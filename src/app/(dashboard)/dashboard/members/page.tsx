import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { ManageMembersContentWrapper } from "./ManageMembersContentWrapper";

export default async function ManageMembersPage() {
	const sessionData = await getServerSession();

	if (!sessionData?.user) redirect("/login");

	if (sessionData.user.role !== "ADMIN") redirect("/dashboard");

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Manage Members</h1>
			</div>

			<ManageMembersContentWrapper />
		</div>
	);
}
