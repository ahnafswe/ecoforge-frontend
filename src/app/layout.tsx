import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export const metadata: Metadata = {
	title: "EcoForge",
	description: "Community-driven environmental solutions",
};

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(jakarta.variable, "font-sans antialiased")}
		>
			<body className="flex min-h-screen flex-col bg-background text-foreground scheme-only-dark">
				<Toaster
					position="top-right"
					theme="dark"
					richColors
					closeButton
					duration={3500}
				/>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
