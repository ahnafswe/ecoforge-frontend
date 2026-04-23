import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiX, SiYoutube } from "react-icons/si";
import { TbMailFilled, TbPhoneFilled } from "react-icons/tb";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-foreground/5 bg-zinc-900/50 pt-16 pb-8">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
					<div className="flex flex-col gap-4 md:col-span-1">
						<Link
							href="/"
							className="flex items-center gap-1 text-2xl font-bold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
						>
							<Image
								src="/logo.png"
								alt="Logo"
								width={32}
								height={32}
							/>
							EcoForge
						</Link>
						<p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
							The premier community for pitching, discussing, and funding
							high-impact environmental solutions.
						</p>
						<div className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
							<a
								href="mailto:mahnaf.swe@gmail.com"
								className="flex items-center gap-2 hover:text-primary transition-colors w-max"
							>
								<TbMailFilled className="size-4" />
								mahnaf.swe@gmail.com
							</a>
							<a
								href="tel:8801710243940"
								className="flex items-center gap-2 hover:text-primary transition-colors w-max"
							>
								<TbPhoneFilled className="size-4" />
								+880 1710 243940
							</a>
						</div>
					</div>

					{/* <div className="flex flex-col gap-4">
						<h4 className="font-bold text-foreground">Platform</h4>
						<ul className="flex flex-col gap-3 text-sm text-foreground/70">
							<li>
								<Link
									href="/ideas"
									className="hover:text-primary transition-colors"
								>
									Explore Ideas
								</Link>
							</li>
							<li>
								<Link
									href="/categories"
									className="hover:text-primary transition-colors"
								>
									Browse Categories
								</Link>
							</li>
							<li>
								<Link
									href="/leaderboard"
									className="hover:text-primary transition-colors"
								>
									Top Innovators
								</Link>
							</li>
						</ul>
					</div> */}

					<div className="flex flex-col gap-4">
						<h4 className="font-bold text-foreground">Company</h4>
						<ul className="flex flex-col gap-3 text-sm text-foreground/70">
							<li>
								<Link
									href="/about"
									className="hover:text-primary transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="hover:text-primary transition-colors"
								>
									Our Blog
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-4">
						<h4 className="font-bold text-foreground">Legal</h4>
						<div className="flex flex-col gap-3 text-sm text-foreground/70">
							<Link
								href="/privacy"
								className="hover:text-primary transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="hover:text-primary transition-colors"
							>
								Terms of Service
							</Link>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h4 className="font-bold text-foreground">Connect</h4>
						<div className="flex gap-2">
							<a
								href="https://linkedin.com/in/mahnafdev"
								target="_blank"
								rel="noreferrer"
								className="rounded-full bg-foreground/5 p-2.5 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
							>
								<FaLinkedin className="size-5" />
							</a>
							<a
								href="https://github.com/mahnafdev"
								target="_blank"
								rel="noreferrer"
								className="rounded-full bg-foreground/5 p-2.5 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
							>
								<SiGithub className="size-5" />
							</a>
							<a
								href="https://x.com/mahnaf_swe"
								target="_blank"
								rel="noreferrer"
								className="rounded-full bg-foreground/5 p-2.5 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
							>
								<SiX className="size-5" />
							</a>
							<a
								href="https://youtube.com/@mahnaf-dev"
								target="_blank"
								rel="noreferrer"
								className="rounded-full bg-foreground/5 p-2.5 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
							>
								<SiYoutube className="size-5" />
							</a>
						</div>
					</div>
				</div>

				<div className="mt-8 flex flex-col items-center justify-between border-t border-foreground/10 pt-8 sm:flex-row gap-4">
					<p className="text-sm text-foreground/50">
						&copy; {currentYear} EcoForge. All rights reserved.
					</p>
					<p className="text-sm text-foreground/50 flex items-center gap-1">
						Built with <span className="text-primary">&#10084;</span> for the earth.
					</p>
				</div>
			</div>
		</footer>
	);
}
