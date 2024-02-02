"use client";
import { Button } from "@/components/button";
import { OrderCard } from "@/components/orderCard";
import { setupAPIClient } from "@/services/api";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
	const [orders, setOrders] = useState([]);

	const getOrders = async () => {
		const apiClient = setupAPIClient();

		try {
			const response = await apiClient.get("/order");
			if (response.data.lenght === 0) {
				toast.warning("No orders! ");
				return;
			}
			setOrders(response.data);
		} catch {
			toast.error("Falha ao listar pedidos! ");
		}
	};

	useEffect(() => {
		getOrders();
	});

	return (
		<div className="flex flex-col w-full h-screen justify-center items-center">
			<div className="grid grid-cols-1 gap-4 w-1/3">
				<div className="flex items-center mr-auto w-full gap-2 text-left">
					<h1 className="text-white-100 font-[700] text-[22px] md:text-[28px] lg:text-[32px] xl:text-[38px]">
						Ultimos Pedidos
					</h1>
					<Button onClick={() => getOrders()}>
						<RotateCw className="text-green-100 w-6 h-6 " />
					</Button>
				</div>
				{orders.length === 0 ? (
					<h1 className="text-red-100 font-[700] text-[22px] md:text-[28px] lg:text-[32px] xl:text-[38px]">
						Sem pedidos no momento!
					</h1>
				) : (
					orders.map((item, index) => (
						<OrderCard key={index} data={item} />
					))
				)}
			</div>
		</div>
	);
}
