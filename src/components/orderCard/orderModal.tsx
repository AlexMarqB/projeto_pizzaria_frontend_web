import { setupAPIClient } from "@/services/api";
import { X } from "lucide-react";
import {  useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../button";

interface ModalProps {
	isOpen: boolean;
	onClose: (value: boolean) => void;
	order_id: string;
	table: number;
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
	order: {
		id: string;
		table: number;
		status: boolean;
		draft: boolean;
		name: string | null;
		bill: number;
		created_at: string;
		updated_at: string;
	};
}

export function OrderModal({ isOpen, onClose, order_id, table }: ModalProps) {
	const [items, setItems] = useState<OrderItem[]>([]);
	const apiClient = setupAPIClient();

	const getItems = async () => {

		try {
			const response = await apiClient.get(
				`/order/detail?order_id=${order_id}`
			);
			console.log(order_id);
			console.log(response.data);
			setItems(response.data);
		} catch {
			toast.error("Falha ao listar items! ");
		}
	};

	const finishOrder = async () => {
		try {
			const response = await apiClient.put("/order/finish", { order_id })
			if(response.data.status) {
				toast.success("Pedido finalizado com sucesso! ")
				onClose(false)
			}
		} catch {
			toast.error("Não foi possivel finalizar o pedido! ")
		}
	}

	useEffect(() => {
		if (isOpen) {
			getItems();
		}
	}, [isOpen]);

	return isOpen && (
		<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
			<div className="bg-blue-200 w-1/3 h-2/3 p-6 rounded-lg">
				<X
					type="button"
					onClick={() => onClose(false)}
					className="text-red-100 w-10 h-10 self-start mb-auto cursor-pointer"
				/>
				<div className="flex flex-col gap-3 h-full mt-auto overflow-y-auto overflow-x-hidden">
					<h1 className="text-white-100 font-semibold text-xl">
						Detalhes do pedido
					</h1>
					<h2 className="text-green-100 font-medium">Mesa {table}</h2>
					{items.map((item, index) => (
						<div className="flex flex-col text-white-100" key={index}>
							<h3>
								{item.amount}x -{" "}
								<span className="text-green-100">
									{item.product.name}
								</span>
							</h3>
							<span>{item.product.description}</span>
						</div>
					))}
					<Button color="red" className="mt-10" onClick={() => finishOrder()}>
						Concluir pedido
					</Button>
				</div>
			</div>
		</div>
	)
}
