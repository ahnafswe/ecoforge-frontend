"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingIdeas } from "@/services/ideas";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiTrendingUp, FiArrowUpRight } from "react-icons/fi";
import { TbPhotoOff } from "react-icons/tb";

export function TrendingIdeas() {
	const {
		data: trendingIdeas,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["ideas", "trending"],
		queryFn: getTrendingIdeas,
	});

	return (
		<section className="px-4 pb-16 md:pb-24 lg:pb-40">
			<div className="container mx-auto max-w-7xl">
				<div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
					<div>
						<div className="mb-3 flex items-center gap-3 text-sm font-bold tracking-widest text-primary">
							<FiTrendingUp className="size-4" />
							<span>Trending in Community</span>
						</div>
						<h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
							Ideas turning the tide
						</h2>
					</div>
					<Link
						href="/ideas"
						tabIndex={-1}
					>
						<Button
							variant="outline"
							className="hidden md:flex h-10 px-5"
						>
							View all ideas
						</Button>
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{isLoading &&
						Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="h-105 animate-pulse rounded-2xl border border-black/5 bg-white/3"
							/>
						))}

					{isError && (
						<div className="col-span-1 md:col-span-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
							Failed to load trending ideas. Please try refreshing.
						</div>
					)}

					{trendingIdeas?.map((idea: any) => (
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
										<img
											src="/icons/paid-badge.png"
											alt="Paid Idea"
											title="Pay to Explore"
											className="h-7 w-auto"
										/>
									)}
								</div>
							</div>

							<div className="bg-white/4 flex flex-1 flex-col px-6 py-5">
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
					))}
				</div>

				{/* Mobile View All Button */}
				<div className="mt-8 md:hidden">
					<Link
						href="/ideas"
						tabIndex={-1}
					>
						<Button
							variant="outline"
							className="w-full"
						>
							View all ideas
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
