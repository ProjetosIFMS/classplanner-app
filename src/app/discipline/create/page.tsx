import DisciplineForm from "../components/Discipline-form";

const CreateDiscipline = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <DisciplineForm title="Dados da disciplina" />
      </div>
    </section>
  );
};

export default CreateDiscipline;
