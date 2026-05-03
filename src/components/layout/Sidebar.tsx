"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import Image from "next/image";
import { useState } from "react";
import { TbMenu2, TbX } from "react-icons/tb";

export function Sidebar({ role }: { role: string }) {
	const [isOpen, setIsOpen] = useState(false);
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

	const closeSidebar = () => setIsOpen(false);

	return (
		<>
			<div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950 w-full fixed top-0 left-0 z-40">
				<Link
					href="/"
					className="flex items-center gap-2 text-xl font-bold"
				>
					<Image
						src="/logo.png"
						alt="Logo"
						width={28}
						height={28}
					/>
					EcoForge
				</Link>
				<button
					onClick={() => setIsOpen(true)}
					className="p-2 text-zinc-400 hover:text-white"
				>
					<TbMenu2 className="size-6" />
				</button>
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
					onClick={closeSidebar}
				/>
			)}

			<aside
				className={`
                fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-800/75 bg-zinc-950 lg:bg-zinc-900/50 px-6 py-8 flex flex-col transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:min-h-screen
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
			>
				<div className="mb-12 flex items-center justify-between">
					<Link
						href="/"
						onClick={closeSidebar}
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
					<button
						onClick={closeSidebar}
						className="lg:hidden text-zinc-400"
					>
						<TbX className="size-6" />
					</button>
				</div>

				<nav className="flex-1 flex flex-col gap-2 text-zinc-300">
					{sidebarLinks.map((link) => {
						const isActive = pathname === link.path;
						return (
							<Link
								key={link.path}
								href={link.path}
								onClick={closeSidebar}
								className={`px-4 py-2 rounded-md transition-colors font-medium ${
									isActive
										? "bg-primary/10 text-primary border border-primary/20"
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
		</>
	);
}
