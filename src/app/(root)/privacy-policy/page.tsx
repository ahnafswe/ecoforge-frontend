import Link from "next/link";
import { TbLock, TbEye, TbDatabase, TbUserCheck } from "react-icons/tb";

export default function PrivacyPolicy() {
	const sections = [
		{
			icon: <TbUserCheck className="text-primary size-6" />,
			title: "Information We Collect",
			content:
				"We keep it minimal. When you join the forge, we collect your name, email, and any profile data you choose to share. We also track your upvotes and the ideas you submit so we can build your 'Hall of Fame' profile.",
		},
		{
			icon: <TbEye className="text-primary size-6" />,
			title: "Public Visibility",
			content:
				"EcoForge is a public space. Any idea you submit, along with your name and profile picture, will be visible to other users. Don't post the 'secret formula' if you aren't ready for the world to see it.",
		},
		{
			icon: <TbDatabase className="text-primary size-6" />,
			title: "Data Usage",
			content:
				"Your data is used to run the platform. We use it to filter pending ideas, manage votes, and occasionally send you updates if your idea hits the trending list. We do not sell your data to third parties.",
		},
		{
			icon: <TbLock className="text-primary size-6" />,
			title: "Security & Control",
			content:
				"We use secure industry-standard protocols to keep your account safe. You have the right to edit your profile or delete your account whenever you choose—once you're gone, your data is scrubbed from the forge.",
		},
	];

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-300 py-16 px-6">
			<div className="max-w-3xl mx-auto">
				<header className="mb-16 text-center lg:text-left">
					<h1 className="text-4xl font-black tracking-tight mb-4">
						Privacy in <span className="text-primary">EcoForge</span>
					</h1>
					<p className="text-zinc-500 leading-relaxed">
						Last updated: May 3, 2026. We believe in transparency. Here is how we
						handle your data at EcoForge.
					</p>
				</header>

				<div className="space-y-12">
					{sections.map((section, index) => (
						<section
							key={index}
							className="group"
						>
							<div className="flex items-center gap-3 mb-4">
								{section.icon}
								<h2 className="text-xl font-bold tracking-wide">
									{section.title}
								</h2>
							</div>
							<p className="text-zinc-400 leading-relaxed border-l-2 border-zinc-800 pl-6 group-hover:border-primary transition-colors">
								{section.content}
							</p>
						</section>
					))}
				</div>

				<footer className="mt-20 text-center">
					<p className="text-sm text-zinc-500 mb-4">
						Have questions about how your data is forged? Reach out via the AI
						chatbot.
					</p>
					<Link
						href="/"
						className="text-primary font-semibold hover:underline"
					>
						Back to Home
					</Link>
				</footer>
			</div>
		</div>
	);
}
