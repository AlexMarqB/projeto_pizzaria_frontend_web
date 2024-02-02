"use client";
import { api } from "@/services/apiClient";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

type UserProps = {
	id: string;
	name: string;
	email: string;
};

type SignInProps = {
	email: string;
	password: string;
};

type SignUpProps = {
	name: string;
	email: string;
	password: string;
};

interface AuthContextData {
	user: UserProps | undefined;
	isAuthenticated: boolean;
	signIn: (credentials: SignInProps) => Promise<void>;
	signUp: (credential: SignUpProps) => Promise<void>;
	signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
	destroyCookie(undefined, "@nextauth.token");
	window.location.href = "/";
};

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	const [user, setUser] = useState<UserProps>();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	async function signIn({ email, password }: SignInProps) {
		try {
			const response = await api.post("/auth", { email, password });
			const { id, name, token } = response.data;

			setUser({
				id,
				name,
				email,
			});

			setIsAuthenticated(true);

			setCookie(undefined, "@nextauth.token", token, {
				maxAge: 24 * 60 * 60 * 30, // expires in 1 month
				path: "/", // accessible from all routes
			});

			router.push("/dashboard");
		} catch (error) {
			console.log("Error signing in:", error);
		}
	}

	async function signUp({ name, email, password }: SignUpProps) {
		try {
			const response = await api.post("/users", { name, email, password });

			toast.success("Conta criada com sucesso");

			router.push("/");
		} catch (err) {
			toast.error("Erro ao cadastrar!");
			console.log(`Error creating user ${err}`);
		}
	}

	useEffect(() => {
		const { "@nextauth.token": token } = parseCookies();

		if (token) {
			setIsAuthenticated(true);
			if (pathname === "/" || pathname === "/register") {
				router.push("/dashboard");
			}
		} else {
			setIsAuthenticated(false);
			if (pathname !== "/") {
				router.push("/");
			}
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signIn, signUp, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}
