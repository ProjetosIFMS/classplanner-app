"use server";
import { Header } from "@/app/_components/header";
import { PPCForm } from "../Ppc-form";

const CreatePPC = async () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <PPCForm title="Criar PPC" />
      </div>
    </section>
  );
};

export default CreatePPC;
