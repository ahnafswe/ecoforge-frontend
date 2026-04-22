"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuPositioner,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const NAV_LINKS = [
	{ name: "Home", href: "/" },
	{ name: "Ideas", href: "/ideas" },
	{ name: "About Us", href: "/about" },
	{ name: "Blog", href: "/blog" },
];

export function Navbar() {
	const pathname = usePathname();

	const [isAuthenticated] = useState(false);

	const user = {
		name: "Neo",
		image: "https://api.dicebear.com/9.x/notionists/svg?seed=Neo",
	};

	return (
		<header className="sticky top-0 z-50 w-full bg-background/70 border-b border-b-zinc-400/5 backdrop-blur-md">
			<div className="container mx-auto max-w-7xl flex h-16 items-center justify-between max-md:px-4">
				<div className="flex items-center gap-2">
					<Link
						href="/"
						className="flex items-center gap-1 text-xl font-bold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
					>
						<Image
							src="/logo.png"
							alt="Logo"
							width={32}
							height={32}
							priority
						/>
						EcoForge
					</Link>
				</div>

				<nav className="hidden md:flex items-center gap-8">
					{NAV_LINKS.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.name}
								href={link.href}
								className={`font-medium transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring text-[15px] rounded-sm px-1 py-0.5 ${
									isActive ? "text-foreground" : "text-foreground/70"
								}`}
							>
								{link.name}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center justify-end gap-4">
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full cursor-pointer">
								<div className="h-9 w-9 overflow-hidden rounded-full border border-black/10 transition-transform hover:scale-105 dark:border-white/10">
									<img
										src={user.image}
										alt={user.name}
										className="h-full w-full object-cover"
									/>
								</div>
							</DropdownMenuTrigger>

							<DropdownMenuPositioner
								align="end"
								sideOffset={8}
							>
								<DropdownMenuContent className="w-48">
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												{user.name}
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												member@ecoforge.com
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />

									<Link
										href="/profile"
										className="outline-none"
									>
										<DropdownMenuItem className="cursor-pointer">
											Profile
										</DropdownMenuItem>
									</Link>
									<Link
										href="/dashboard"
										className="outline-none"
									>
										<DropdownMenuItem className="cursor-pointer">
											Dashboard
										</DropdownMenuItem>
									</Link>

									<DropdownMenuSeparator />
									<DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive data-[variant=destructive]:text-destructive">
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenuPositioner>
						</DropdownMenu>
					) : (
						<div className="flex items-center gap-3">
							<Link
								href="/login"
								tabIndex={-1}
							>
								<Button
									variant="outline"
									className="rounded-sm text-foreground/80 hover:text-foreground"
								>
									Login
								</Button>
							</Link>
							<Link
								href="/signup"
								tabIndex={-1}
							>
								<Button className="rounded-sm">Sign Up</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
