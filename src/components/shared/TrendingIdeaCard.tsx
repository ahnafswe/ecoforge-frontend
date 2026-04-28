import { Idea } from "@/services/ideas";
import Link from "next/link";
import { TbPhotoOff } from "react-icons/tb";
import { Button } from "../ui/button";

export function TrendingIdeaCard({ idea }: { idea: Idea }) {
	return (
		<div
			key={idea.id}
			className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:scale-102 hover:border-primary/50"
		>
			<div className="relative h-56 w-full overflow-hidden bg-white/7">
				{idea.thumbnail ? (
					<img
						src={idea.thumbnail}
						alt={idea.title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<div className="h-full w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
						<TbPhotoOff className="size-16 text-zinc-500" />
					</div>
				)}
				<div className="absolute w-full px-3 top-3 flex justify-between gap-2">
					<span className="rounded-full bg-background px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-md">
						{idea.category.name}
					</span>
					{idea.isPaid && (
						<div className="p-1.25 rounded-sm bg-background">
							<img
								src="/icons/paid-badge.png"
								alt="Paid Idea"
								title="Paid Idea"
								className="h-6 w-auto"
							/>
						</div>
					)}
				</div>
			</div>

			<div className="bg-[#0d0d0f] flex flex-1 flex-col px-6 py-5">
				<h3 className="mb-3 text-xl font-bold leading-tight transition-colors">
					{idea.title}
				</h3>

				<p className="mb-2 line-clamp-5 leading-normal text-sm text-foreground/70">
					{idea.description}
				</p>

				<div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/5">
					<div className="flex items-center gap-2">
						{idea.author.image ? (
							<img
								src={idea.author.image}
								alt={idea.author.name}
								className="h-8 w-8 rounded-full border border-black/10 object-cover dark:border-white/10"
							/>
						) : (
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold uppercase text-primary">
								{idea.author.name.charAt(0)}
							</div>
						)}
						<span className="text-sm font-medium text-foreground/90">
							{idea.author.name}
						</span>
					</div>

					<Link
						href={`/ideas/${idea.id}`}
						tabIndex={-1}
					>
						<Button
							variant="secondary"
							size="sm"
							className="font-medium text-[13px] rounded-sm"
						>
							Know More
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
