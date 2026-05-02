import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminDashboardContentWrapper } from "./AdminDashboardContentWrapper";
import { MemberDashboardContentWrapper } from "./MemberDashboardContentWrapper";

export default async function DashboardPage() {
	const sessionData = await getServerSession();

	if (!sessionData?.user) redirect("/login");

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Overview</h1>
			</div>

			{sessionData?.user.role === "ADMIN" ? (
				<AdminDashboardContentWrapper />
			) : (
				<MemberDashboardContentWrapper />
			)}
		</div>
	);
}
