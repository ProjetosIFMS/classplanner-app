import { AreaForm } from "../components/create-area-form";

export default function CreateArea() {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <AreaForm
          title="Crie uma nova área"
          description="Preencha os detalhes para à criação de uma nova área"
        />
      </div>
    </section>
  );
}
