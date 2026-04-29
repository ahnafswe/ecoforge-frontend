import { getServerSession } from "@/lib/session";
import { ProfileCard } from "./ProfileCard";

export default async function ProfilePage() {
	const sessionData = await getServerSession();

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold tracking-tight leading-none">Profile</h1>

			<ProfileCard user={sessionData.user} />
		</div>
	);
}
