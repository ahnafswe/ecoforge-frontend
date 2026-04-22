import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbLogin2, TbMessages } from "react-icons/tb";

export function Hero() {
	return (
		<section className="relative overflow-hidden px-4 pb-16">
			<div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
				<div className="flex flex-col items-start justify-center text-left">
					<h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
						Build the future of <br className="hidden md:block" />
						<span className="text-primary">sustainability</span> together
					</h1>

					<p className="mt-6 max-w-lg text-lg text-foreground/70 md:text-xl">
						The premier community for pitching, discussing, and funding high-impact
						environmental solutions. Got an idea? We have the platform.
					</p>

					<div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
						<Link
							href="/signup"
							tabIndex={-1}
							className="w-full sm:w-auto"
						>
							<Button
								size="lg"
								className="w-full h-12 text-base font-semibold shadow-sm sm:w-auto flex items-center gap-x-1.5"
							>
								<TbLogin2 className="size-5" />
								Start Forging Ideas
							</Button>
						</Link>
						<Link
							href="/ideas"
							tabIndex={-1}
							className="w-full sm:w-auto"
						>
							<Button
								variant="outline"
								size="lg"
								className="w-full h-12 text-base font-semibold sm:w-auto flex items-center gap-x-1.5"
							>
								<TbMessages className="size-5" />
								Explore the Feed
							</Button>
						</Link>
					</div>
				</div>

				<div className="relative mx-auto w-full max-w-xl">
					<img
						src="/images/eco-consciousness.png"
						alt="Eco consciousness"
						title="Eco conscious"
						className="w-full rounded-2xl border border-black/10 object-cover shadow-2xl dark:border-white/10"
					/>
				</div>
			</div>
		</section>
	);
}
