"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/form/input";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Home() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setLoading] = useState(false)

	const { signIn } = useContext(AuthContext);

	const handleSubmit = async () => {
		if (!email || email === "" || !password || password === "") {
			alert("Missing data!");
			return;
		}

		setLoading(true);

		await signIn({ email, password });

		setLoading(false);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="flex font-[700] text-[50px] md:text-[65px] lg:text-[70px] xl:text-[90px] mb-8 items-center">
				<h1 className="text-white-100">Sujeito</h1>
				<h1 className="text-red-100 ml-[-14px] lg:ml-[-1.5rem]">Pizza</h1>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="flex flex-col justify-center items-center gap-4 md:w-72 lg:w-[330px] xl:w-[400px]"
			>
				<Input
					type="email"
					id="email"
					placeholder="Digite seu email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type="password"
					id="password"
					placeholder="Sua senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button loading={isLoading} color="red" type="submit">
					Acessar
				</Button>
				<button
					className="text-white-100"
					type="button"
					onClick={() => router.push("/register")}
				>
					Não possui uma conta? Cadastre-se
				</button>
			</form>
		</div>
	);
}
