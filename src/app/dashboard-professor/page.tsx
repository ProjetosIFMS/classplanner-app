"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../_components/header";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <section>
      <Header />
      <main className="flex flex-col items-center justify-center"></main>
    </section>
  );
};

export default Dashboard;
