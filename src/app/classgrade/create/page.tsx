import { ClassgradeForm } from "./components/classgrade-form";

export default function CreateClassgrade() {
  return (
    <div className="px-6">
      <ClassgradeForm
        description="Selecione as unidades curriculares"
        title="Criação de turma"
      />
    </div>
  );
}
