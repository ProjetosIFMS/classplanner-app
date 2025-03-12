import { CourseForm } from "../components/course-form";

export default function CreateCourse() {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <CourseForm title="Criação de um novo curso" />
      </div>
    </section>
  );
}
