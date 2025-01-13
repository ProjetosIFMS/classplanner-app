import { useRouter } from "next/router"
import { useEffect } from "react";
import { cookies } from "next/headers";

export const Callback = async () => {
    const router = useRouter();

    async function storeToken(data: string){
        const cookieStore = await cookies()
        cookieStore.set("jwtToken", data)
    }

    useEffect( () => {
        
        const { token } = router.query
        if (token === typeof("string")){
            storeToken(token)
            router.push('/dashboard')
        }
    }, [router])


    return (
        <h2>Carregando...</h2>
    )
        

}