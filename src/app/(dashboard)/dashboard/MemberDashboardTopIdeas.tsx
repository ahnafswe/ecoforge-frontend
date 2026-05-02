import { IdeaCard } from "@/components/shared/IdeaCard";
import { Idea } from "@/services/ideas";

export function MemberDashboardTopIdeas({ ideas }: { ideas: Idea[] }) {
	return (
		<div className="grid grid-cols-4 gap-4">
			{ideas.map((idea) => (
				<IdeaCard
					key={idea.id}
					idea={idea}
				/>
			))}
		</div>
	);
}
