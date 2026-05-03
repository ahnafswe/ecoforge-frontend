import Link from "next/link";
import { TbGavel, TbAlertTriangle, TbCopyOff, TbCloudUpload } from "react-icons/tb";

export default function TermsOfService() {
	const terms = [
		{
			icon: <TbCloudUpload className="text-primary size-6" />,
			title: "Content Submission",
			content:
				"When you forge an idea, you grant EcoForge a non-exclusive right to display it. You represent that the idea is yours to share and doesn't violate anyone else's intellectual property.",
		},
		{
			icon: <TbCopyOff className="text-primary size-6" />,
			title: "No Guarantees",
			content:
				"EcoForge is a side-project for sharing concepts. We don't guarantee that any idea submitted here will be built, protected, or remain private. Use the forge at your own risk.",
		},
		{
			icon: <TbGavel className="text-primary size-6" />,
			title: "Community Conduct",
			content:
				"Keep it clean. No spam, no harassment, and no 'low-effort' noise. Admins reserve the right to quench (delete) any idea or ban any user that disrupts the forge's purpose.",
		},
		{
			icon: <TbAlertTriangle className="text-primary size-6" />,
			title: "Limitation of Liability",
			content:
				"Since this is an experimental platform, we aren't liable for any data loss, 'stolen' ideas, or downtime. The forge is provided 'as-is' without warranties of any kind.",
		},
	];

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-300 py-16 px-6">
			<div className="max-w-3xl mx-auto">
				<header className="mb-16">
					<div className="flex items-center gap-3 mb-4">
						<TbGavel className="text-primary size-8" />
						<h1 className="text-4xl font-black text-white tracking-tight">
							The Rules of <span className="text-primary">EcoForge</span>
						</h1>
					</div>
					<p className="text-zinc-500 leading-relaxed max-w-xl">
						By entering EcoForge, you agree to these rules. It's a space for ideas,
						so let's keep the engine running smoothly.
					</p>
				</header>

				<div className="space-y-12 mb-20">
					{terms.map((term, index) => (
						<div
							key={index}
							className="relative pl-8 border-l border-zinc-800 hover:border-primary transition-colors duration-300"
						>
							<div className="absolute -left-3.25 top-0 bg-zinc-950 p-1">
								{term.icon}
							</div>
							<h2 className="text-xl font-bold text-white mb-3 tracking-wider">
								{term.title}
							</h2>
							<p className="text-zinc-400 leading-relaxed text-sm">
								{term.content}
							</p>
						</div>
					))}
				</div>

				<footer className="text-center">
					<p className="text-zinc-400 mb-6 italic">
						"Ideas are cheap. Execution is everything. Forge wisely."
					</p>
				</footer>
			</div>
		</div>
	);
}
