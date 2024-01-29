"use client"
import { Button } from "@/components/button";
import { Input } from "@/components/form/input";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex font-[700] text-[50px] md:text-[65px] lg:text-[70px] xl:text-[90px] mb-8 items-center"><h1 className="text-white-100">Sujeito</h1><h1 className="text-red-100 ml-[-14px] lg:ml-[-1.5rem]">Pizza</h1></div>
      <form action="" className="flex flex-col justify-center items-center gap-4 md:w-72 lg:w-[330px] xl:w-[400px]">
        <Input type="email" id="email" placeholder="Digite seu email"/>
        <Input type="password" id="password" placeholder="Sua senha" />
        <Button color="red" type="submit">Acessar</Button>
        <button className="text-white-100" type="button" onClick={() => router.push("/cadastro")}>Não possui uma conta? Cadastre-se</button>
      </form>
    </main>
  );
}
