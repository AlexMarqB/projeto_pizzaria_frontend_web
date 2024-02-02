"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/form/input";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { PayModal } from "./payModal";

interface Order {
	id: string;
	table: number;
	status: boolean;
	draft: boolean;
	name?: string;
	bill: number;
	created_at: Date;
	updated_at: Date;
}

interface OrderItem {
	id: string;
	amount: number;
	created_at: string;
	updated_at: string;
	order_id: string;
	product_id: string;
	product: {
		id: string;
		name: string;
		price: string;
		description: string;
		banner: string;
		created_at: string;
		updated_at: string;
		category_id: string;
	};
}

export default function Payment() {
	const [modal, setModal] = useState(false);
	const [table, setTable] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [consumedList, setConsumedList] = useState<OrderItem[]>([]);
	const [ordersList, setOrdersList] = useState<Order[]>([]);

	let finalValue = 0;
	const getItems = async () => {
		const apiClient = setupAPIClient();
		try {
			const ordersResponse = await apiClient.get(
				`/order/table?table=${table}`
			);
			console.log(ordersResponse.data);
			const { orders, orderItems } = ordersResponse.data;
			setOrdersList(orders);
			setConsumedList(orderItems);
			orders.forEach((order: any) => (finalValue += order.bill));
			setIsLoading(false);
			setModal(true);
		} catch (err) {
			toast.error(
				"Falha ao listar consumo verifique se o numero da mesa está correto! "
			);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	ordersList.forEach((order) => (finalValue += order.bill));

	return (
		<>
			<div className="flex w-full h-screen justify-center items-center">
				<form
					className="flex flex-col w-1/3 gap-3 items-center text-left"
					onSubmit={(e) => {
						e.preventDefault();
						getItems();
					}}
				>
					<h1 className="w-full font-semibold text-white-100 text-[22px] md:text-[28px] lg:text-[32px] xl:text-[38px]">
						Digite o numero da mesa
					</h1>
					<Input
						type="text"
						placeholder="Digite o nome da nova categoria"
						value={table}
						onChange={(e) => setTable(parseInt(e.target.value))}
					/>
					<Button loading={isLoading} type="submit" color="green">
						Buscar
					</Button>
				</form>
			</div>
			<PayModal
				isOpen={modal}
				onClose={setModal}
				table={table}
				items={consumedList}
				orders={ordersList}
				value={finalValue}
			/>
		</>
	);
}
