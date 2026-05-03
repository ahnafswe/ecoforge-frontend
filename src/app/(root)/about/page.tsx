import Link from "next/link";
import { TbBulb, TbUsers, TbCircleCheck, TbTrophy } from "react-icons/tb";

export default function AboutPage() {
	const steps = [
		{
			icon: <TbBulb className="size-8" />,
			title: "Submit",
			desc: "Got a wild idea? Post it to the forge and let the world see it.",
		},
		{
			icon: <TbCircleCheck className="size-8" />,
			title: "Review",
			desc: "Our community and admins filter the noise so the best ideas shine.",
		},
		{
			icon: <TbUsers className="size-8" />,
			title: "Vote",
			desc: "The community decides. Upvote the masterpieces you want to see built.",
		},
	];

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			<section className="px-6 py-20 text-center border-b border-zinc-900">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
						Fuel the <span className="text-primary">Ideas.</span>
					</h1>
					<p className="text-lg text-zinc-400 leading-relaxed">
						EcoForge is a community-driven platform where great ideas don't just sit
						in a notebook - they get shared, debated, and ranked. Whether it's a
						small tweak or a massive breakthrough, every idea has a home here.
					</p>
				</div>
			</section>

			<section className="px-6 py-20 max-w-6xl mx-auto">
				<h2 className="text-2xl font-bold mb-12 text-center md:text-left">
					How EcoForge Works
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((step, i) => (
						<div
							key={i}
							className="group p-8 rounded-2xl border border-zinc-800 bg-zinc-900/20 hover:border-primary/50 transition-all"
						>
							<div className="text-primary mb-4 group-hover:scale-110 transition-transform">
								{step.icon}
							</div>
							<h3 className="text-xl font-bold mb-2">{step.title}</h3>
							<p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className="px-6 py-20 bg-zinc-900/30 border-y border-zinc-800/50">
				<div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
					<div className="flex-1 space-y-4">
						<div className="inline-flex items-center gap-2 text-yellow-500 font-bold text-sm tracking-widest uppercase">
							<TbTrophy /> The Hall of Fame
						</div>
						<h2 className="text-3xl font-bold">Claim Your Legacy</h2>
						<p className="text-zinc-400 leading-relaxed">
							The highest-voted ideas make it into our{" "}
							<span className="font-bold">Hall of Fame</span>. It's the ultimate
							leaderboard for creators. If your idea gets approved and hits the
							top, everyone on the platform will know exactly who's running the
							forge.
						</p>
					</div>
					<div className="w-full md:w-1/3 aspect-square rounded-3xl bg-linear-to-br from-primary/20 to-zinc-900 flex items-center justify-center">
						<TbTrophy className="size-24 text-primary" />
					</div>
				</div>
			</section>

			<section className="px-6 py-24 text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-8">
					Stop sitting on your ideas.
				</h2>
				<Link
					href="/dashboard/my-ideas"
					className="inline-block px-8 py-4 bg-primary text-background rounded-lg font-bold hover:bg-primary/85 transition-all active:scale-95"
				>
					Start Forging Now
				</Link>
			</section>
		</div>
	);
}
