"use client";
import { useState } from "react";
import { signOut } from "@/contexts/authContext";
import { AlignJustify, LogOut, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../button";

export function Header() {
	const router = useRouter();
	const pathname = usePathname();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const navigate = (link: string) => {
		router.push(link);
	};

	return (
		<header
			className={`flex justify-between w-full px-4 md:px-16 items-center pt-7 z-20 ${
				pathname === "/" || pathname === "/register" ? "hidden" : "fixed"
			}`}
		>
			<div className="flex font-[700] text-[22px] md:text-[28px] lg:text-[32px] xl:text-[42px] justify-center items-center">
				<h1 className="text-white-100">Sujeito</h1>
				<h1 className="text-red-100 ml-[-14px] lg:ml-[-0.7rem]">Pizza</h1>
			</div>
			{/* Links normais */}
			<div className="hidden md:flex justify-around gap-3 items-center text-[22px] md:text-[26px] lg:text-[25px] xl:text-[25px] text-white-100 min-md:max-lg:w-1/3 xl:w-2/6">
				<Button type="button" onClick={() => navigate("/category")}>
					Categoria
				</Button>
				<Button type="button" onClick={() => navigate("/product")}>
					Produtos
				</Button>
				<Button type="button" onClick={() => navigate("/dashboard")}>
					Pedidos
				</Button>
				<LogOut
					className="h-6 w-6 lg:h-10 lg:w-10 hover:cursor-pointer transform transition hover:scale-125 ease-in-out"
					type="button"
					onClick={() => signOut()}
				/>
			</div>
			{/* Botão do Menu para abrir o Sidebar */}
			<AlignJustify
				className="md:hidden flex text-white-100 h-6 w-6 sm:h-10 sm:w-10"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			{/* Sidebar */}
			{isSidebarOpen && (
				<div className="md:hidden flex flex-col gap-3 absolute top-0 right-0 z-50 w-1/3 py-3 px-2 bg-blue-200">
					<X
						type="button"
						onClick={() => setIsSidebarOpen(false)}
						className="text-red-100 w-7 h-7 self-start mb-auto cursor-pointer"
					/>
					<Button
						classNames="border-2 border-x-0 border-blue-100"
						type="button"
						onClick={() => navigate("/category")}
					>
						Categoria
					</Button>
					<Button
						classNames="border-2 border-x-0 border-blue-100"
						type="button"
						onClick={() => navigate("/product")}
					>
						Produtos
					</Button>
					<Button
						classNames="border-2 border-x-0 border-blue-100"
						type="button"
						onClick={() => navigate("/dashboard")}
					>
						Pedidos
					</Button>
					<LogOut
						className="w-7 h-7 self-end text-white-100 hover:cursor-pointer transform transition hover:scale-125 ease-in-out"
						type="button"
						onClick={() => signOut()}
					/>
				</div>
			)}
		</header>
	);
}
