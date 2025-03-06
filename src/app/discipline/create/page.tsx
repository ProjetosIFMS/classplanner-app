import { Header } from "@/app/_components/header";
import DisciplineForm from "../Discipline-form";

const CreateDiscipline = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <DisciplineForm title="Dados da disciplina" />
      </div>
    </section>
  );
};

export default CreateDiscipline;
