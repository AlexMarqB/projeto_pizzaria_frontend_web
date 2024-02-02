"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/form/input";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Category() {
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		if (name === "") {
			toast.error("Preencha o campo nome da categoria! ");
			return;
		}

		const apiClient = setupAPIClient();

		setIsLoading(true);

		try {
			await apiClient
				.post("category", {
					name,
				})
				.then(() => {
					setIsLoading(false);
					toast.success("Categoria cadastrada com sucesso! ");
					setName("");
				});
		} catch {
			toast.error("Categoria já existe! ");
			setIsLoading(false);
		}
	};
	return (
		<div className="flex w-full h-screen justify-center items-center">
			<form
				className="flex flex-col w-1/3 gap-3 items-center text-left"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<h1 className="w-full font-semibold text-white-100 text-[22px] md:text-[28px] lg:text-[32px] xl:text-[38px]">
					Nova categoria
				</h1>
				<Input
					type="text"
					placeholder="Digite o nome da nova categoria"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Button loading={isLoading} type="submit" color="green">
					Cadastrar
				</Button>
			</form>
		</div>
	);
}
