import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./Errors/AuthTokenError";
import { signOut } from "@/contexts/authContext";

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(res => {
        return res
    }, (err: AxiosError) => {
        if(err.response?.status === 401) {
            //qualquer erro 401 devemos deslogar o user
            if(typeof window !== undefined) {
                console.log("Sign out")
                signOut()
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(err)
    })

    return api
}