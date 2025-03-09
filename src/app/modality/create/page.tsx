"use server";
import { Header } from "@/app/_components/header";
import ModalityForm from "../modality-form";

const CreateModality = async () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <ModalityForm title={""} />
      </div>
    </section>
  );
};

export default CreateModality;
