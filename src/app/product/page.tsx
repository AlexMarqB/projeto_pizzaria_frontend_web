"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/form/input";
import { Header } from "@/components/header";
import { setupAPIClient } from "@/services/api";
import { Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { getStaticProps } from "next/dist/build/templates/pages";

type CategoryProps = {
	id: string;
	name: string;
};

export const getCategories: GetStaticProps<{ categories: CategoryProps[] }> =
	(async (context) => {
		const apiClient = setupAPIClient();
		try {
			const response = await apiClient.get<CategoryProps[]>("/category");
            console.log(response.data)
			const categories = response.data;
			return { props: { categories } };
		} catch {
			toast.error("Falha ao listar categorias! ");
			return { props: { categories: [] } };
		}
	}) satisfies GetStaticProps<{ categories: CategoryProps[] }>;

export default function Product(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const JSONCategories = JSON.stringify(props)
    console.log(props)
    console.log(JSONCategories)

	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [value, setValue] = useState("");
	const [description, setDescription] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const [fileURL, setFileURL] = useState("");
	const [file, setFile] = useState<File>();

	function handleFile(e: ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) {
			return;
		}

		const img = e.target.files[0];

		if (!img) {
			return;
		}

		if (img.type === "image/jpeg" || img.type === "image/png") {
			setFile(img);
			setFileURL(URL.createObjectURL(e.target.files[0]));
		}
	}

	const handleSubmit = async () => {
		const apiClient = setupAPIClient();
		if (name === "" || value === "" || description === "") {
			toast.error("Preencha todos os campos! ");
			return;
		}

		const formatValue = Number(value.replace(",", ".").trim()).toFixed(2);

		setIsLoading(true);

		try {
			await apiClient
				.post("product", {
					name,
				})
				.then(() => {
					setIsLoading(false);
					toast.success("Produto cadastrado com sucesso! ");
					setName("");
				});
		} catch {
			toast.error("Categoria já existe! ");
			setIsLoading(false);
		}
	};

    async function getCat() {
        const apiClient = setupAPIClient();
		try {
			const response = await apiClient.get<CategoryProps[]>("/category");
            console.log(response.data)
			const categories = response.data;
            console.log(categories)
			return categories;
		} catch {
			toast.error("Falha ao listar categorias! ");
			return 
		}
    }

	return (
		<>
			<Header />
			<div className="flex w-full h-screen justify-center items-center">
				<form
					className="flex flex-col w-1/3 gap-3 items-center text-left"
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<h1 className="w-full font-semibold text-white-100 text-[22px] md:text-[28px] lg:text-[32px] xl:text-[38px]">
						Novo produto
					</h1>

					<label className="flex cursor-pointer justify-center items-center border-gray-100 border rounded-sm text-white-100 min-w-60 w-fit min-h-60 h-fit p-3 bg-blue-200">
						<span className="absolute z-30 transform transition hover:scale-125 ease-in-out">
							<Upload className="w-10 h-10 text-white-200" />
						</span>

						<input
							type="file"
							accept="image/png, image/jpeg"
							className="hidden"
							onChange={(e) => handleFile(e)}
						/>

						{fileURL && <img src={fileURL} alt="Foto do produto" />}
					</label>

					<select
						className="appearance-none outline-none focus:ring-0 hover:no-underline row-start-1 col-start-1 border-gray-100 border rounded-sm text-white-100 w-full p-3 bg-blue-200 h-10 md:h-[36px] lg:h-[40px] xl:h-[46px] text-sm md:text-[14px] lg:text-[16px] xl:text-[18px]"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						{/* {categories.map((item) => (
							<option key={item.id} value={item.name}>
								{item.name}
							</option>
						))} */}
					</select>
					<Input
						type="text"
						placeholder="Nome do produto"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Valor"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<textarea
						className="border-gray-100 border rounded-sm text-white-100 w-full p-3 bg-blue-200 h-10 md:h-[36px] lg:h-[40px] xl:h-[46px] text-sm md:text-[14px] lg:text-[16px] xl:text-[18px]"
						placeholder="Descrição"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Button loading={isLoading} type="submit" color="green">
						Cadastrar
					</Button>
				</form>
                <button type="button" onClick={() => getCat()}>Fetch</button>
			</div>
		</>
	);
}
