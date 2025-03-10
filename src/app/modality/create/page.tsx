"use server";
import ModalityForm from "../modality-form";

const CreateModality = async () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <ModalityForm title={""} />
      </div>
    </section>
  );
};

export default CreateModality;
