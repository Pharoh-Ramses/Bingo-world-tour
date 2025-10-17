import type React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
