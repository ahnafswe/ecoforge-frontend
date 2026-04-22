import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbEyeSpark, TbUserPlus } from "react-icons/tb";

export default function CallToAction() {
	return (
		<section className="px-4 pb-16 md:pb-24 lg:pb-40">
			<div className="relative z-10 container mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-primary px-6 py-20 text-center text-background shadow-2xl md:px-16 md:py-24">
				<div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[100px]" />

				<h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
					Ready to forge the future?
				</h2>
				<p className="mx-auto mt-4 max-w-2xl text-lg text-background/80 md:text-xl">
					Join hundreds of innovators, engineers, and environmentalists building the
					next generation of sustainable technology. Your idea could be the next one
					we fund.
				</p>

				<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
					<Link
						href="/signup"
						tabIndex={-1}
					>
						<Button
							variant="outline"
							className="h-13 w-full rounded-lg bg-lime-400 px-5! text-base font-bold hover:bg-background/10 hover:text-background sm:w-auto"
						>
							<TbUserPlus />
							Create Free Account
						</Button>
					</Link>
					<Link
						href="/ideas"
						tabIndex={-1}
					>
						<Button
							variant="outline"
							className="h-13 w-full rounded-lg border-background/20 bg-transparent px-5! text-base font-bold hover:bg-background/10 hover:text-background sm:w-auto"
						>
							<TbEyeSpark />
							Explore the Platform
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
