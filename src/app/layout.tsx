import type { Metadata } from "next";
import { Stack_Sans_Text, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const stackSans = Stack_Sans_Text({
	subsets: ["latin"],
	variable: "--font-stack-sans",
});

export const metadata: Metadata = {
	title: "EcoForge",
	description: "Community-driven environmental solutions",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(stackSans.variable, "font-sans")}
		>
			<body>{children}</body>
		</html>
	);
}
