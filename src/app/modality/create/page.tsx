"use server";
import ModalityForm from "../components/modality-form";

const CreateModality = async () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <ModalityForm
          title={"Crie uma nova modalidade"}
          description={
            "Crie a modalidade à qual as disciplinas estarão vinculadas."
          }
        />
      </div>
    </section>
  );
};

export default CreateModality;
