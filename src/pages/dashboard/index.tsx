
"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")
        console.log(token)
    }, [router])
    return(
        <h1>Bem vindo ao Classplaner</h1>
    )
}