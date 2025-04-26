import React from "react";

import { DeleteDialog } from "@/app/_components/dialogs/delete-dialog";
import { Course } from "@/types/course";
import { Session } from "@/types/session";
import { useDeleteCourse } from "@/hooks/react-query/courses";

interface DeleteCourseModalProps {
  session: Session;
  data: Course;
}

export function DeleteCourseModal({ session, data }: DeleteCourseModalProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const deleteCourse = useDeleteCourse(session);

  function handleDelete(course_id: string) {
    setIsOpen(false);
    deleteCourse.mutate(course_id);
  }

  return (
    <DeleteDialog
      handleDelete={() => handleDelete(data.id)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Deletar curso"
      description={`Tem certeza que deseja excluir o curso ${data.name}? Esta ação não pode ser desfeita.`}
    />
  );
}
