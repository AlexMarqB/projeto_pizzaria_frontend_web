"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/form/input";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Register() {
    const router = useRouter()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confPassword, setConfPassword] = useState("")

	const [isLoading, setIsLoading] = useState(false)

    const navigate = (link: string) => {
        router.push(link)
    }

	const { signUp } = useContext(AuthContext)

	const handleSubmit = async () => {
		if(!name || name === "" || !email || email === "" || !password || password === "" || !confPassword || confPassword === "") {
			alert("Missing data")
			return
		}

		if(password !== confPassword) {
			alert("Passwords do not match")
			return
		}

		setIsLoading(true)

		await signUp({name, email, password})

		setIsLoading(false)
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="flex font-[700] text-[50px] md:text-[65px] lg:text-[70px] xl:text-[90px] mb-8 items-center">
				<h1 className="text-white-100">Sujeito</h1>
				<h1 className="text-red-100 ml-[-14px] lg:ml-[-1.5rem]">Pizza</h1>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit()
				}}
				className="flex flex-col justify-center items-center gap-4 md:w-72 lg:w-[330px] xl:w-[400px]"
			>
				<Input type="text" id="nome" placeholder="Nome da empresa" value={name} onChange={(e) => setName(e.target.value)}/>
				<Input type="email" id="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				<Input type="password" id="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
				<Input type="password" id="confPassword" placeholder="Confirme a senha" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
				<Button loading={isLoading} color="red" type="submit">
					Acessar
				</Button>
				<button className="text-white-100" type="button" onClick={() => navigate('/')}>
					Já possuo uma conta.
				</button>
			</form>
		</main>
	);
}
