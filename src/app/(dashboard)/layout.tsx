import { Sidebar } from "@/components/layout/Sidebar";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const sessionData = await getServerSession();

	return (
		<AuthGuard redirectTo="/login">
			<div className="flex min-h-screen">
				<Sidebar role={sessionData.user.role} />

				<main className="flex-1 overflow-y-auto p-8">{children}</main>
			</div>
		</AuthGuard>
	);
}
