"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories";
import * as TbIcons from "react-icons/tb";

export default function Categories() {
	const {
		data: categories,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	return (
		<section className="relative">
			<div className="container mx-auto max-w-7xl">
				<div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-12">
					<div className="lg:sticky lg:top-32 lg:w-1/3">
						<h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
							Find your <br className="hidden lg:block" />
							<span className="text-primary">impact zone.</span>
						</h2>
						<p className="mt-4 text-lg text-foreground/70">
							Whether you're developing renewable grid tech or grassroots
							community programs, we have 11 specialized categories ready for your
							solutions.
						</p>
						<div className="mt-6 flex items-center gap-4">
							<div className="h-8 w-1 rounded-full bg-primary" />
							<p className="text-sm font-semibold uppercase tracking-widest text-foreground/50">
								Powered by community
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:w-2/3">
						{isLoading &&
							Array.from({ length: 11 }).map((_, i) => (
								<div
									key={i}
									className={`m-2 h-24 animate-pulse rounded-xl bg-white/5 ${i % 5 === 0 ? "md:col-span-2" : ""}`}
								/>
							))}

						{isError && (
							<div className="md:col-span-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
								Failed to load categories. Please try refreshing.
							</div>
						)}

						{categories?.map((cat, index) => {
							const IconComponent =
								TbIcons[cat.icon as keyof typeof TbIcons] ||
								TbIcons.TbQuestionMark;

							const isWide = index % 5 === 0;

							return (
								<div
									key={cat.id}
									className={`group relative overflow-hidden rounded-2xl border border-black/10 p-4 ${
										isWide
											? "col-span-1 md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-4"
											: "col-span-1 flex flex-col gap-2"
									}`}
								>
									<div className="w-fit shrink-0 rounded-md bg-primary/10 p-3 text-primary transition-transform duration-200 group-hover:scale-110">
										<IconComponent className="size-8" />
									</div>
									<div>
										<h3
											className={`font-bold tracking-tight group-hover:text-lime-100 transition-colors ${isWide ? "text-xl" : "text-lg"}`}
										>
											{cat.name}
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-foreground/60">
											{cat.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
