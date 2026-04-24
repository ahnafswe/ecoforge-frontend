"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IdeaCard } from "@/components/shared/IdeaCard";
import { Idea, getIdeas } from "@/services/ideas";
import { getCategories } from "@/services/categories";
import { Input } from "@/components/ui/input";
import { TbSearch, TbLoader2, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { Slider } from "@/components/ui/slider";

export default function IdeasFeed() {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("all");
	const [isPaidFilter, setIsPaidFilter] = useState<boolean | undefined>();
	const [sortBy, setSortBy] = useState<"recent" | "top_voted" | "most_commented">("recent");
	const [minVotes, setMinVotes] = useState(0);
	const [limit, setLimit] = useState(12);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [search, category, isPaidFilter, sortBy, minVotes]);

	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	const {
		data: ideas,
		isLoading,
		isError,
	} = useQuery<Idea[]>({
		queryKey: ["ideas", search, category, isPaidFilter, sortBy, minVotes, page, limit],
		queryFn: () =>
			getIdeas({
				search: search || undefined,
				categoryId: category === "all" ? undefined : category,
				isPaid: isPaidFilter,
				sortBy,
				minVotes,
				limit,
				page,
			}),
	});

	const highestVote = ideas ? Math.max(...ideas.map((i) => i.upvoteCount), 0) : 0;
	const sliderMaxValue = Math.max(highestVote, 3);

	return (
		<div className="container mx-auto max-w-7xl max-lg:px-4 pt-8 pb-16">
			<div className="mb-6 flex flex-col gap-1">
				<h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
					Discover Ideas
				</h1>
				<p className="text-lg text-foreground/60">
					Explore, fund, and build the ideas that will reshape our planet.
				</p>
			</div>

			<div className="mb-10 flex flex-col gap-4">
				<div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
					<div className="relative w-full md:max-w-md">
						<TbSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
						<Input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search by title or author"
							className="w-lg bg-[#0d0d0f] pl-9"
						/>
					</div>

					<div className="flex items-center rounded-md border border-foreground/10 bg-background py-0.5 shadow-sm">
						<button
							onClick={() =>
								setIsPaidFilter(isPaidFilter === false ? undefined : false)
							}
							className={`px-4 py-1.5 text-sm font-semibold transition-all ${
								isPaidFilter === false
									? "text-primary"
									: "text-foreground/80 hover:text-lime-200"
							}`}
						>
							Free
						</button>
						<div className="mx-1 h-5 w-px bg-white/15" />
						<button
							onClick={() =>
								setIsPaidFilter(isPaidFilter === true ? undefined : true)
							}
							className={`px-4 py-1.5 text-sm font-semibold transition-all ${
								isPaidFilter === true
									? "text-primary"
									: "text-foreground/80 hover:text-lime-200"
							}`}
						>
							Paid
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium tracking-wider text-foreground/70">
							Category
						</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="h-9 rounded-md border border-foreground/15 bg-[#0d0d0f] px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-zinc-700"
						>
							<option value="all">All Categories</option>
							{categories?.map((category) => (
								<option
									key={category.id}
									value={category.id}
								>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium tracking-wider text-foreground/70">
							Sort By
						</label>
						<select
							value={sortBy}
							onChange={(e) =>
								setSortBy(
									e.target.value as "recent" | "top_voted" | "most_commented",
								)
							}
							className="h-9 rounded-md border border-foreground/15 bg-[#0d0d0f] px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-zinc-700"
						>
							<option value="recent">Recently Posted</option>
							<option value="top_voted">Most Votes</option>
							<option value="most_commented">Most Comments</option>
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<label className="text-sm font-medium tracking-wider text-foreground/70">
								Minimum Votes
							</label>
							<span className="text-sm font-medium text-primary">{minVotes}</span>
						</div>
						<div className="flex h-9 items-center">
							<Slider
								min={0}
								max={sliderMaxValue}
								value={minVotes}
								onValueChange={(v) => setMinVotes(Number(v))}
							/>
						</div>
					</div>
				</div>
			</div>

			{isLoading ? (
				<div className="flex min-h-72 w-full items-center justify-center">
					<TbLoader2 className="size-10 animate-spin text-primary" />
				</div>
			) : isError ? (
				<div className="flex min-h-72 w-full flex-col items-center justify-center text-foreground/50">
					<p className="text-lg font-medium">Failed to load ideas</p>
				</div>
			) : ideas?.length === 0 ? (
				<div className="flex min-h-72 w-full flex-col items-center justify-center text-foreground/50">
					<p className="text-lg font-medium">No ideas found matching your filters</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
						{ideas?.map((idea) => (
							<IdeaCard
								key={idea.id}
								idea={idea}
							/>
						))}
					</div>

					<div className="mt-10 flex items-center justify-between">
						<div className="flex flex-col gap-y-2">
							<label className="text-sm font-medium text-foreground/70">
								Show Per Page:
							</label>
							<select
								value={limit}
								onChange={(e) => {
									setLimit(Number(e.target.value));
									setPage(1);
								}}
								className="w-16 h-8 px-2 rounded-sm border border-foreground/15 bg-[#0d0d0f] text-sm outline-none focus:border-ring focus:ring-2 focus:ring-zinc-700"
							>
								<option value={12}>12</option>
								<option value={24}>24</option>
								<option value={36}>36</option>
								<option value={48}>48</option>
							</select>
						</div>

						<div className="flex items-center gap-2">
							<button
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className="flex items-center gap-1 text-foreground/80 transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-50"
							>
								<TbChevronLeft className="size-6" />
							</button>
							<span className="bg-zinc-900/50 border border-zinc-800 px-3 py-1 rounded-sm text-sm font-semibold text-foreground/80">
								{page}
							</span>
							<button
								onClick={() => setPage((p) => p + 1)}
								disabled={!ideas || ideas.length < limit}
								className="flex items-center gap-1 text-foreground/80 transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-50"
							>
								<TbChevronRight className="size-6" />
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
