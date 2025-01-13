import { useRouter } from "next/router"
import { useEffect } from "react";

export const GoogleAuthCallback = async () => {
    const router = useRouter();

    async function storeToken(data: string){
        localStorage.setItem("jwtToken", data)
        console.log(data)
    }

    useEffect( () => {
       const handleCallback = async () => {
        try{
            const response = await fetch("http://localhost:3000/google/redirect", {
                credentials: "include",
                headers:{
                    "Accept": "application/json",
                }
            })

            if (!response.ok){
                throw new Error("Erro ao autenticar com o Google")
            }

            const data = await response.json();
           
            storeToken(data)
            router.push('/dashboard')
        } catch(error){
            router.push("/login")
        }}

        if (router.query.code){
            handleCallback();
        }

    }, [router])

    

    return (
        <h2>Carregando...</h2>
    )
        

}