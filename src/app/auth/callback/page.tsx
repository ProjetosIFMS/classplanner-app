"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();

  async function storeToken(data: string) {
    localStorage.setItem("jwtToken", data);
  }

  useEffect(() => {
    const handleToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("access_token");

      if (!token) {
        return router.push("/");
      }

      storeToken(token);
      router.push("/dashboard-professor");
    };

    handleToken();
  }, [router]);

  return (
    <h2 className="flex items-center text-muted-foreground text-xl">
      Carregando...
    </h2>
  );
}
