import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { MyIdeasContentWrapper } from "./MyIdeasContentWrapper";
import { IdeaFormDialog } from "./IdeaFormDialog";

export default async function MyIdeasPage() {
	const sessionData = await getServerSession();

	if (!sessionData?.user) redirect("/login");

	if (sessionData.user.role !== "MEMBER") redirect("/dashboard");

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-3xl font-bold tracking-tight">My Ideas</h1>
				<IdeaFormDialog />
			</div>

			<MyIdeasContentWrapper />
		</div>
	);
}
