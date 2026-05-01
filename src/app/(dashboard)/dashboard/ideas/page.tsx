import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { ManageIdeasContentWrapper } from "./ManageIdeasContentWrapper";

export default async function ManageIdeasPage() {
	const sessionData = await getServerSession();

	if (!sessionData?.user) redirect("/login");

	if (sessionData.user.role !== "ADMIN") redirect("/dashboard");

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Manage Ideas</h1>
			</div>

			<ManageIdeasContentWrapper />
		</div>
	);
}
