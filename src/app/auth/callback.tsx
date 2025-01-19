"use server"
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function GoogleAuthCallback() {
    const router = useRouter();

    async function storeToken(data: string){
        localStorage.setItem("jwtToken", data)
    }

    useEffect(() => {
      const handleToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('access_token');
  
        if (!token) {
          return router.push('/');
        }
  
        storeToken(token);
        router.push('/dashboard');
      };
  
      handleToken();
    }, [router]);

    

    return (
        <h2>Carregando...</h2>
    )
        

}