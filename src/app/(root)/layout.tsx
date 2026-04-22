import { Navbar } from "@/components/layout/Navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header>
				<Navbar />
				{children}
			</header>
		</>
	);
}
