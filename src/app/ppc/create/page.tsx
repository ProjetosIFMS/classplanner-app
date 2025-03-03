"use server";
import { Header } from "@/app/_components/header";
import { PPCForm } from "../ppc-form";

const CreatePPC = async () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <PPCForm title="Criar PPC" />
      </main>
    </section>
  );
};

export default CreatePPC;
