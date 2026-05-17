import { Sidebar } from "@/components/layout/Sidebar";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const sessionData = await getServerSession();

	console.log("Session Data:", sessionData);

	if (!sessionData) redirect("/login");

	return (
		<div className="flex min-h-screen">
			<Sidebar role={sessionData.user.role} />

			<main className="flex-1 overflow-y-auto px-4 lg:px-8 py-8">{children}</main>
		</div>
	);
}
