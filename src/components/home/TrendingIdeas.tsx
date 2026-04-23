"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingIdeas, Idea } from "@/services/ideas";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiTrendingUp, FiArrowUpRight } from "react-icons/fi";
import { TbPhotoOff } from "react-icons/tb";
import { TrendingIdeaCard } from "../shared/TrendingIdeaCard";

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

					{trendingIdeas?.map((idea: Idea) => (
						<TrendingIdeaCard idea={idea} />
					))}
				</div>

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
