import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/authContext";

const roboto = Roboto({
	weight: ["100", "400", "700", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SujeitoPizza",
	description: "Pizzaria",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${roboto.className} bg-blue-100`}>
				<AuthContextProvider>
					<main>{children}</main>
				</AuthContextProvider>
			</body>
		</html>
	);
}
