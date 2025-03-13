"use server";
import { PPCForm } from "../components/Ppc-form";

const CreatePPC = async () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <PPCForm
          title="Criação de Plano Pedagógico de Curso"
          description="Preencha os detalhes do Plano Pedagógico de Curso"
        />
      </div>
    </section>
  );
};

export default CreatePPC;
