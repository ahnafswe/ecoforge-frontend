import Link from "next/link";
import { TbPhotoOff, TbMessage, TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Idea } from "@/services/ideas";

export function IdeaCard({ idea }: { idea: Idea }) {
	return (
		<div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f] transition-all duration-300 hover:border-primary/50 hover:scale-101">
			<div className="relative w-full h-48 overflow-hidden bg-zinc-900">
				{idea.thumbnail ? (
					<img
						src={idea.thumbnail}
						alt={idea.title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-zinc-500 transition-transform duration-300 group-hover:scale-110">
						<TbPhotoOff className="size-12" />
					</div>
				)}

				{idea.isPaid && (
					<div className="absolute top-3 right-3">
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
				)}
			</div>

			<div className="flex flex-1 flex-col p-4">
				<div className="flex items-center gap-2">
					{idea.author.image ? (
						<img
							src={idea.author.image}
							alt={idea.author.name}
							className="size-7 rounded-full object-cover"
						/>
					) : (
						<div className="size-7 rounded-full bg-zinc-900" />
					)}
					<span className="text-sm font-medium text-foreground/90">
						{idea.author.name}
					</span>
				</div>

				<p className="mt-3 w-fit rounded-full bg-zinc-800/60 px-3 py-1 text-[13px] font-semibold text-foreground/80">
					{idea.category.name}
				</p>

				<h3 className="mt-2 text-[17px] font-semibold line-clamp-2">{idea.title}</h3>

				<p className="mt-1 text-sm text-foreground/70 line-clamp-4">
					{idea.description}
				</p>

				<div className="flex-1" />

				<div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2">
					<div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
						<div className="flex items-center gap-1">
							<TbArrowBigUp className="size-4 text-foreground/60" />
							{idea.upvoteCount}
						</div>
						<div className="flex items-center gap-1">
							<TbArrowBigDown className="size-4 text-foreground/60" />
							{idea.downvoteCount}
						</div>
						<div className="flex items-center gap-1">
							<TbMessage className="size-4 text-foreground/60" />
							{idea._count.comments}
						</div>
					</div>

					<Link
						href={`/ideas/${idea.id}`}
						target="_blank"
						tabIndex={-1}
					>
						<Button
							size="sm"
							variant="outline"
							className="bg-background text-foreground/90 rounded-sm px-3 text-[13px]"
						>
							Know More
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
