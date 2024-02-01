"use client";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Dashboard() {
	const router = useRouter();

	return (
		<>
			<Header />
			<div className="flex w-full justify-center items-center h-screen">
				<Button
					color="green"
					type="button"
					onClick={() => router.push("/product")}
				>
					Product
				</Button>
			</div>
		</>
	);
}
