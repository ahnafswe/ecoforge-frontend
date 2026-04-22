export function ImpactMetrics() {
	const metrics = [
		{ value: "100+", label: "Ideas Forged" },
		{ value: "4k+", label: "Votes Casted" },
		{ value: "$200k+", label: "Funded" },
		{ value: "11", label: "Categories" },
	];

	return (
		<section className="border-y border-white/5 bg-zinc-900/25 py-12 mb-16 md:mb-24 lg:mb-40">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/10">
					{metrics.map((metric, idx) => (
						<div
							key={idx}
							className="flex flex-col items-center justify-center text-center px-4 transition-transform hover:scale-105"
						>
							<span className="text-4xl font-extrabold tracking-tight text-primary md:text-[2.5rem]">
								{metric.value}
							</span>
							<span className="mt-2 text-sm font-bold tracking-wider text-zinc-400 md:text-base">
								{metric.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
