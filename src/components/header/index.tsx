"use client";
import { signOut } from "@/contexts/authContext";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../button";

export function Header() {
	const router = useRouter();
	const pathname = usePathname()

	const navigate = (link: string) => {
		router.push(link);
	};
	return (
		<header className={`flex justify-between w-full px-16 items-center pt-7 z-20 ${(pathname === '/' || pathname === '/register') ? "hidden" : "fixed"}`}>
			<div className="flex font-[700] text-[22px] md:text-[28px] lg:text-[32px] xl:text-[42px] justify-center items-center">
				<h1 className="text-white-100">Sujeito</h1>
				<h1 className="text-red-100 ml-[-14px] lg:ml-[-0.7rem]">Pizza</h1>
			</div>
			<div className="flex justify-around items-center text-[22px] md:text-[26px] lg:text-[25px] xl:text-[25px] text-white-100 lg:w-2/6">
				{/* <Button type="button" onClick={() => navigate("/payment")}>
					Pagamento
				</Button> */}
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
					className="w-7 h-7 hover:cursor-pointer transform transition hover:scale-125 ease-in-out"
					type="button"
					onClick={() => signOut()}
				/>
			</div>
		</header>
	);
}
