import { useRouter } from "next/router"
import { useEffect } from "react";
import { cookies } from "next/headers";


const Dashboard = () => {
    
    async function getToken() {
        const cookieStore = await cookies();
        const token  = cookieStore.get("jwtToken")
        return token
    }

    const router = useRouter();


    useEffect(() => {
        const token = getToken()
        if (!token){
            router.push("/login")
        }
    })
    return(
        <h1>Bem vindo ao Classplaner</h1>
    )
}