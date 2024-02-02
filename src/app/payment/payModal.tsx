import { Button } from "@/components/button";
import { setupAPIClient } from "@/services/api";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

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

interface ModalProps {
	isOpen: boolean;
	onClose: (value: boolean) => void;
	orders: Order[];
	items: OrderItem[];
	table: number;
	value: number;
}

export function PayModal({
	isOpen,
	onClose,
	orders,
	items,
	table,
}: ModalProps) {
	const apiClient = setupAPIClient();

	const finishOrder = async () => {
		try {
			for (const order of orders) {
				const response = await apiClient.delete(
					`/order?order_id=${order.id}`
				);
			}
			toast.success("Pagamento finalizado com sucesso! ");
			onClose(false);
		} catch (error) {
			toast.error("Não foi possível finalizar o pagamento! ");
		}
	};

	return (
		isOpen && (
			<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
				<div className="bg-blue-200 w-1/3 h-2/3 p-6 rounded-lg">
					<X
						type="button"
						onClick={() => onClose(false)}
						className="text-red-100 w-10 h-10 self-start mb-auto cursor-pointer"
					/>
					<button type="button" onClick={() => {
						console.log(items)
						console.log(orders)
					}}>Listar</button>
					<div className="flex flex-col gap-3 h-full mt-auto overflow-y-auto overflow-x-hidden">
						<h1 className="text-white-100 font-semibold text-xl">
							Detalhes do pedido
						</h1>
						<h2 className="text-green-100 font-medium">Mesa {table}</h2>
						{items.map((item) => (
							<div
								className="flex flex-col text-white-100"
								key={item.id}
							>
								<h3>
									{item.amount}x -{" "}
									<span className="text-green-100">
										{item.product.name}
									</span>
								</h3>
								<span className="text-green-100">
									R${parseFloat(item.product.price).toFixed(2)}
								</span>
							</div>
						))}
						<Button
							color="green"
							className="mt-10"
							onClick={() => finishOrder()}
						>
							Concluir pedido
						</Button>
					</div>
				</div>
			</div>
		)
	);
}
