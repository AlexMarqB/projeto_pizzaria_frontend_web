"use client"
import { api } from "@/services/apiClient";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";

type UserProps = {
    id: string,
    name: string,
    email: string
}

type SignInProps = {
    email: string,
    password: string
}

type SignUpProps = {
    name: string,
    email: string,
    password: string
}



interface AuthContextData {
    user: UserProps | undefined;
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signUp: (credentials: SignUpProps) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export const signOut = () => {

    try {
        destroyCookie(undefined, "@nextauth.token")
        useRouter().push('/')
    } catch (err) {
        console.log(`Error singing out ${err}`)
    }
}

export function AuthContextProvider({children}: {children: ReactNode}) {
    const router = useRouter()

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post("/auth", {email, password})

            const {id, name, token} = response.data

            setCookie(undefined, "@nextauth.token", token, {
                maxAge: 24 * 60 * 60 * 30, //expira em 1 mês
                path: "/" //quais caminhos tem acesso ao cookie
            })

            //setamos a informação do user
            setUser({
                id, 
                name,
                email
            })

            //passar para proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //redirecionar para /dashboard

            router.push('/dashboard')

        } catch(err) {
            console.log(`Error signing in ${err}`)
        }
    }

    async function signUp({name, email, password}: SignUpProps) {
        try {
            const response = await api.post("/users", {name, email, password})

            console.log("Registered Successfully")

            router.push('/')
        } catch (err) {
            console.log(`Error creating user ${err}`)
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
