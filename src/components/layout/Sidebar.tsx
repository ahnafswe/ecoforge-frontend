"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import Image from "next/image";

export function Sidebar({ role }: { role: string }) {
	const pathname = usePathname();
	const router = useRouter();

	const sidebarLinks: { label: string; path: string }[] = [
		{ label: "Overview", path: "/dashboard" },
		{ label: "Profile", path: "/profile" },
	];

	if (role === "MEMBER") {
		sidebarLinks.push({ label: "My Ideas", path: "/dashboard/my-ideas" });
	}

	if (role === "ADMIN") {
		sidebarLinks.push({ label: "Manage Members", path: "/dashboard/members" });
		sidebarLinks.push({ label: "Manage Ideas", path: "/dashboard/ideas" });
	}

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
		<aside className="w-64 border-r border-zinc-800/75 bg-zinc-900/50 px-6 py-8 flex flex-col min-h-screen">
			<div className="mb-12">
				<Link
					href="/"
					className="flex items-center gap-1 text-2xl font-bold tracking-tight hover:text-primary transition-colors duration-200"
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

			<nav className="flex-1 flex flex-col gap-2 text-zinc-300">
				{sidebarLinks.map((link) => {
					const isActive = pathname === link.path;

					return (
						<Link
							key={link.path}
							href={link.path}
							className={`px-4 py-2 rounded-md transition-colors font-medium ${
								isActive
									? "bg-primary/7 text-primary border border-primary/20"
									: "hover:bg-zinc-900 hover:text-foreground"
							}`}
						>
							{link.label}
						</Link>
					);
				})}
			</nav>

			<div className="mt-6">
				<button
					onClick={handleLogout}
					className="w-full px-4 py-2 text-left text-destructive hover:bg-destructive/10 rounded-md transition-colors font-medium"
				>
					Log Out
				</button>
			</div>
		</aside>
	);
}
