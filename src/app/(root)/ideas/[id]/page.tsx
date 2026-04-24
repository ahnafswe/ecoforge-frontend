import { Metadata } from "next";
import { IdeaDetails } from "./IdeaDetails";

export const metadata: Metadata = {
	title: "Idea Details | EcoForge",
	description: "Explore the brief breakdown of this environmental idea.",
};

export default async function IdeaDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	return (
		<div className="min-h-screen bg-background">
			<IdeaDetails id={id} />
		</div>
	);
}
