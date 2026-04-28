"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuPositioner,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
	DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { authClient } from "@/lib/authClient";
import { TbUser } from "react-icons/tb";

const NAV_LINKS = [
	{ name: "Home", href: "/" },
	{ name: "Ideas", href: "/ideas" },
	{ name: "About Us", href: "/about" },
	{ name: "Blog", href: "/blog" },
];

export function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = authClient.useSession();

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
				},
			},
		});
	};

	return (
		<header className="sticky top-0 z-50 w-full bg-background/70 border-b border-b-zinc-400/5 backdrop-blur-md">
			<div className="container mx-auto max-w-7xl flex h-16 items-center justify-between max-md:px-4">
				<div className="flex items-center gap-2">
					<Link
						href="/"
						className="flex items-center gap-1 text-xl font-bold tracking-tight"
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
					{session ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full cursor-pointer">
								{session.user.image ? (
									<div className="size-10 overflow-hidden rounded-full border-2 border-primary/50 transition-transform hover:scale-105">
										<img
											src={session.user.image}
											alt={session.user.name}
											className="size-full rounded-full object-cover"
										/>
									</div>
								) : (
									<div className="size-10 overflow-hidden rounded-full border border-white/10 bg-zinc-900/50 transition-transform hover:scale-105 flex items-center justify-center text-foreground/80">
										<TbUser className="size-5" />
									</div>
								)}
							</DropdownMenuTrigger>

							<DropdownMenuPositioner
								align="end"
								sideOffset={8}
							>
								<DropdownMenuContent className="w-48">
									<DropdownMenuGroup>
										<DropdownMenuLabel className="font-normal">
											<div className="flex flex-col space-y-2">
												<p className="text-sm font-medium leading-none">
													{session.user.name}
												</p>
												<p className="text-xs leading-none text-muted-foreground">
													{session.user.email}
												</p>
											</div>
										</DropdownMenuLabel>
									</DropdownMenuGroup>
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

									<DropdownMenuItem
										onClick={handleLogout}
										className="cursor-pointer text-destructive focus:text-destructive data-[variant=destructive]:text-destructive"
									>
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
