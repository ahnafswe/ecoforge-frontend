import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { ProfileCard } from "./ProfileCard";

export default async function ProfilePage() {
	const sessionData = await getServerSession();

	if (!sessionData?.user) redirect("/login");

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div>
				<h1 className="text-3xl font-bold tracking-tight leading-none">Profile</h1>
				<p className="text-zinc-400 mt-2">
					Manage your account details and preferences.
				</p>
			</div>

			<ProfileCard user={sessionData.user} />
		</div>
	);
}
